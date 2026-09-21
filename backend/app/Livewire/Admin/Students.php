<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
#[Title('Students')]
class Students extends Component
{
    use WithFileUploads;
    use WithPagination;

    // ── List / filter state ──────────────────────────────────────────────
    public string $search = '';

    public string $statusFilter = '';

    public int $perPage = 15;

    // ── Form state ───────────────────────────────────────────────────────
    public bool $showForm = false;

    public ?int $editingId = null;

    public string $name = '';

    public string $father_name = '';

    public string $email = '';

    public string $registration_no = '';

    public string $phone = '';

    public string $address = '';

    public string $date_of_birth = '';

    public string $dob_bs = '';

    public $photo = null;

    public string $currentPhoto = '';

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
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $this->resetForm();

        $student = Student::with('courses:id')->findOrFail($id);

        $this->editingId = $student->id;
        $this->name = $student->name;
        $this->father_name = $student->father_name ?? '';
        $this->email = $student->email ?? '';
        $this->registration_no = $student->registration_no ?? '';
        $this->phone = $student->phone;
        $this->address = $student->address ?? '';
        $this->date_of_birth = $student->date_of_birth?->format('Y-m-d') ?? '';
        $this->dob_bs = $student->dob_bs ?? '';
        $this->currentPhoto = $student->photo ?? '';
        $this->status = $student->status;
        $this->courseIds = $student->courses->pluck('id')->all();
        $this->showForm = true;
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
        $this->showView = true;
    }

    public function closeView(): void
    {
        $this->showView = false;
        $this->viewingId = null;
    }

    // ── Delete ───────────────────────────────────────────────────────────

    public function confirmDelete(int $id): void
    {
        $this->deletingId = $id;
        $this->showDeleteConfirm = true;
    }

    public function cancelDelete(): void
    {
        $this->deletingId = null;
        $this->showDeleteConfirm = false;
    }

    public function deleteStudent(): void
    {
        $student = Student::find($this->deletingId);

        if ($student) {
            $photo = $student->photo;
            $student->delete();

            if ($photo) {
                Storage::disk('public')->delete($photo);
            }

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
            'name' => $this->name,
            'father_name' => $this->father_name !== '' ? $this->father_name : null,
            'email' => $this->email !== '' ? $this->email : null,
            'registration_no' => $this->registration_no !== '' ? $this->registration_no : null,
            'phone' => $this->phone,
            'address' => $this->address !== '' ? $this->address : null,
            'date_of_birth' => $this->date_of_birth !== '' ? $this->date_of_birth : null,
            'dob_bs' => $this->dob_bs !== '' ? $this->dob_bs : null,
            'status' => $this->status,
        ];

        $replacingPhoto = $this->photo !== null;

        if ($replacingPhoto) {
            $data['photo'] = $this->photo->store('students', 'public');
        }

        if ($this->editingId) {
            $oldPhoto = DB::transaction(function () use ($data) {
                $student = Student::findOrFail($this->editingId);
                $oldPhoto = $student->photo;
                $student->update($data);
                $student->courses()->sync($this->courseIds);

                return $oldPhoto;
            });

            if ($replacingPhoto && $oldPhoto && $oldPhoto !== $data['photo']) {
                Storage::disk('public')->delete($oldPhoto);
            }

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
            'name' => ['required', 'string', 'max:255'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('students', 'email')->ignore($this->editingId),
            ],
            'registration_no' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'dob_bs' => ['nullable', 'string', 'max:10'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'status' => ['required', 'in:active,inactive'],
            'courseIds' => ['required', 'array', 'min:1'],
            'courseIds.*' => ['integer', 'exists:courses,id'],
        ];
    }

    private function resetForm(): void
    {
        $this->name = '';
        $this->father_name = '';
        $this->email = '';
        $this->registration_no = '';
        $this->phone = '';
        $this->address = '';
        $this->date_of_birth = '';
        $this->dob_bs = '';
        $this->photo = null;
        $this->currentPhoto = '';
        $this->status = 'active';
        $this->courseIds = [];
        $this->editingId = null;
        $this->resetValidation();
    }

    private function notify(string $message, string $type = 'success'): void
    {
        $this->flash = $message;
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
                $term = '%'.$this->search.'%';
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
