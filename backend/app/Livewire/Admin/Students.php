<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
#[Title('Students')]
class Students extends Component
{
    use WithPagination;

    // ── List / filter state ──────────────────────────────────────────────
    public string $search = '';
    public string $statusFilter = '';
    public int $perPage = 15;

    // ── Form state ───────────────────────────────────────────────────────
    public bool $showForm = false;
    public ?int $editingId = null;

    public string $name = '';
    public string $email = '';
    public string $phone = '';
    public string $address = '';
    public string $date_of_birth = '';
    public string $status = 'active';
    public array $courseIds = [];

    // ── View state ───────────────────────────────────────────────────────
    public bool $showView = false;
    public ?int $viewingId = null;

    // ── Delete state ─────────────────────────────────────────────────────
    public bool $showDeleteConfirm = false;
    public ?int $deletingId = null;

    // ── Notification ─────────────────────────────────────────────────────
    public ?string $flash = null;
    public string $flashType = 'success'; // success | error

    // ─────────────────────────────────────────────────────────────────────

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function updatingStatusFilter(): void
    {
        $this->resetPage();
    }

    // ── Form open/close ──────────────────────────────────────────────────

    public function openCreate(): void
    {
        $this->resetForm();
        $this->editingId = null;
        $this->showForm  = true;
    }

    public function openEdit(int $id): void
    {
        $student = Student::with('courses:id')->findOrFail($id);

        $this->editingId      = $student->id;
        $this->name           = $student->name;
        $this->email          = $student->email ?? '';
        $this->phone          = $student->phone;
        $this->address        = $student->address ?? '';
        $this->date_of_birth  = $student->date_of_birth?->format('Y-m-d') ?? '';
        $this->status         = $student->status;
        $this->courseIds      = $student->courses->pluck('id')->all();
        $this->showForm       = true;
    }

    public function closeForm(): void
    {
        $this->showForm = false;
        $this->resetForm();
    }

    // ── View ─────────────────────────────────────────────────────────────

    public function openView(int $id): void
    {
        $this->viewingId = $id;
        $this->showView  = true;
    }

    public function closeView(): void
    {
        $this->showView  = false;
        $this->viewingId = null;
    }

    // ── Delete ───────────────────────────────────────────────────────────

    public function confirmDelete(int $id): void
    {
        $this->deletingId       = $id;
        $this->showDeleteConfirm = true;
    }

    public function cancelDelete(): void
    {
        $this->deletingId       = null;
        $this->showDeleteConfirm = false;
    }

    public function deleteStudent(): void
    {
        $student = Student::find($this->deletingId);

        if ($student) {
            $student->delete();
            $this->notify('Student deleted successfully.');
        }

        $this->cancelDelete();
        $this->resetPage();
    }

    // ── Save (create / update) ───────────────────────────────────────────

    public function save(): void
    {
        $this->validate($this->rules());

        $data = [
            'name'          => $this->name,
            'email'         => $this->email !== '' ? $this->email : null,
            'phone'         => $this->phone,
            'address'       => $this->address !== '' ? $this->address : null,
            'date_of_birth' => $this->date_of_birth !== '' ? $this->date_of_birth : null,
            'status'        => $this->status,
        ];

        if ($this->editingId) {
            DB::transaction(function () use ($data) {
                $student = Student::findOrFail($this->editingId);
                $student->update($data);
                $student->courses()->sync($this->courseIds);
            });
            $this->notify('Student updated successfully.');
        } else {
            DB::transaction(function () use ($data) {
                $student = Student::create($data);
                $student->courses()->attach($this->courseIds);
            });
            $this->notify('Student added successfully.');
            $this->resetPage();
        }

        $this->closeForm();
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:255'],
            'email'         => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('students', 'email')->ignore($this->editingId),
            ],
            'phone'         => ['required', 'string', 'max:50'],
            'address'       => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'status'        => ['required', 'in:active,inactive'],
            'courseIds'     => ['required', 'array', 'min:1'],
            'courseIds.*'   => ['integer', 'exists:courses,id'],
        ];
    }

    private function resetForm(): void
    {
        $this->name          = '';
        $this->email         = '';
        $this->phone         = '';
        $this->address       = '';
        $this->date_of_birth = '';
        $this->status        = 'active';
        $this->courseIds     = [];
        $this->editingId     = null;
        $this->resetValidation();
    }

    private function notify(string $message, string $type = 'success'): void
    {
        $this->flash     = $message;
        $this->flashType = $type;
    }

    public function dismissFlash(): void
    {
        $this->flash = null;
    }

    // ── Render ───────────────────────────────────────────────────────────

    public function render()
    {
        $students = Student::query()
            ->when($this->search, function ($q) {
                $term = '%' . $this->search . '%';
                $q->where(function ($q2) use ($term) {
                    $q2->where('name', 'like', $term)
                       ->orWhere('email', 'like', $term)
                       ->orWhere('phone', 'like', $term);
                });
            })
            ->when($this->statusFilter, fn ($q) => $q->where('status', $this->statusFilter))
            ->withCount('courses')
            ->latest()
            ->paginate($this->perPage);

        $viewStudent = $this->viewingId
            ? Student::with(['courses' => fn ($q) => $q->withPivot(['enrolled_at', 'status'])])
                     ->find($this->viewingId)
            : null;

        $courses = Course::orderBy('name')->get(['id', 'name']);

        return view('livewire.admin.students', compact('students', 'viewStudent', 'courses'));
    }
}
