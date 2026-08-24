<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
#[Title('Courses')]
class Courses extends Component
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
    public string $description = '';
    public string $duration = '';
    public string $price = '';
    public string $status = 'active';

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
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $course = Course::findOrFail($id);

        $this->editingId    = $course->id;
        $this->name         = $course->name;
        $this->description  = $course->description ?? '';
        $this->duration     = $course->duration ?? '';
        $this->price        = $course->price !== null ? (string) $course->price : '';
        $this->status       = $course->status;
        $this->showForm     = true;
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
        $this->deletingId        = $id;
        $this->showDeleteConfirm = true;
    }

    public function cancelDelete(): void
    {
        $this->deletingId        = null;
        $this->showDeleteConfirm = false;
    }

    public function deleteCourse(): void
    {
        $course = Course::find($this->deletingId);

        if ($course) {
            $course->delete();
            $this->notify('Course deleted successfully.');
        }

        $this->cancelDelete();
        $this->resetPage();
    }

    // ── Save (create / update) ───────────────────────────────────────────

    public function save(): void
    {
        $this->validate($this->rules());

        $slug = $this->generateSlug($this->name, $this->editingId);

        $data = [
            'name'        => $this->name,
            'slug'        => $slug,
            'description' => $this->description !== '' ? $this->description : null,
            'duration'    => $this->duration !== '' ? $this->duration : null,
            'price'       => $this->price !== '' ? $this->price : null,
            'status'      => $this->status,
        ];

        if ($this->editingId) {
            Course::findOrFail($this->editingId)->update($data);
            $this->notify('Course updated successfully.');
        } else {
            Course::create($data);
            $this->notify('Course added successfully.');
            $this->resetPage();
        }

        $this->closeForm();
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private function rules(): array
    {
        return [
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'duration'    => ['nullable', 'string', 'max:100'],
            'price'       => ['nullable', 'numeric', 'min:0', 'max:999999.99'],
            'status'      => ['required', 'in:active,inactive'],
        ];
    }

    private function generateSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i    = 1;

        while (
            Course::where('slug', $slug)
                  ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                  ->exists()
        ) {
            $slug = $base . '-' . $i++;
        }

        return $slug;
    }

    private function resetForm(): void
    {
        $this->name        = '';
        $this->description = '';
        $this->duration    = '';
        $this->price       = '';
        $this->status      = 'active';
        $this->editingId   = null;
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
        $courses = Course::query()
            ->when($this->search, function ($q) {
                $term = '%' . $this->search . '%';
                $q->where('name', 'like', $term);
            })
            ->when($this->statusFilter, fn ($q) => $q->where('status', $this->statusFilter))
            ->withCount('students')
            ->latest()
            ->paginate($this->perPage);

        $viewCourse = $this->viewingId
            ? Course::with(['students' => fn ($q) => $q->withPivot(['enrolled_at', 'status'])])
                    ->find($this->viewingId)
            : null;

        return view('livewire.admin.courses', compact('courses', 'viewCourse'));
    }
}
