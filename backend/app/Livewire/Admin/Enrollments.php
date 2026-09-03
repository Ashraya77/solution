<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
#[Title('Enrollments')]
class Enrollments extends Component
{
    use WithPagination;

    // ── List / filter state ──────────────────────────────────────────────
    public string $search = '';
    public string $statusFilter = '';
    public string $courseFilter = '';
    public int $perPage = 15;

    // ── Form state ───────────────────────────────────────────────────────
    public bool $showForm = false;
    public ?int $editingId = null;

    public string $student_id = '';
    public string $course_id = '';
    public string $enrolled_at = '';
    public string $status = 'active';

    // ── View state ───────────────────────────────────────────────────────
    public bool $showView = false;
    public ?int $viewingId = null;

    // ── Delete state ─────────────────────────────────────────────────────
    public bool $showDeleteConfirm = false;
    public ?int $deletingId = null;

    // ── Notification ─────────────────────────────────────────────────────
    public bool $showCertificate = false;
    public ?int $certificateEnrollmentId = null;
    public array $grades = [];

    public ?string $flash = null;
    public string $flashType = 'success';

    // ─────────────────────────────────────────────────────────────────────

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function updatingStatusFilter(): void
    {
        $this->resetPage();
    }

    public function updatingCourseFilter(): void
    {
        $this->resetPage();
    }

    // ── Form open/close ──────────────────────────────────────────────────

    public function openCreate(): void
    {
        $this->resetForm();
        $this->enrolled_at = now()->format('Y-m-d\TH:i');
        $this->showForm    = true;
    }

    public function openEdit(int $id): void
    {
        $enrollment = Enrollment::findOrFail($id);

        $this->editingId   = $enrollment->id;
        $this->student_id  = (string) $enrollment->student_id;
        $this->course_id   = (string) $enrollment->course_id;
        $this->enrolled_at = $enrollment->enrolled_at->format('Y-m-d\TH:i');
        $this->status      = $enrollment->status;
        $this->showForm    = true;
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

    public function deleteEnrollment(): void
    {
        $enrollment = Enrollment::find($this->deletingId);

        if ($enrollment) {
            $enrollment->delete();
            $this->notify('Enrollment deleted successfully.');
        }

        $this->cancelDelete();
        $this->resetPage();
    }

    // ── Save (create / update) ───────────────────────────────────────────

    public function save(): void
    {
        $this->validate($this->rules());

        if ($this->editingId) {
            $enrollment = Enrollment::findOrFail($this->editingId);

            // If student or course changed, check for duplicate
            if (
                (int) $this->student_id !== $enrollment->student_id ||
                (int) $this->course_id  !== $enrollment->course_id
            ) {
                $this->guardDuplicate();
            }

            $enrollment->update([
                'student_id'  => $this->student_id,
                'course_id'   => $this->course_id,
                'enrolled_at' => $this->enrolled_at,
                'status'      => $this->status,
            ]);

            $this->notify('Enrollment updated successfully.');
        } else {
            $this->guardDuplicate();

            Enrollment::create([
                'student_id'  => $this->student_id,
                'course_id'   => $this->course_id,
                'enrolled_at' => $this->enrolled_at,
                'status'      => $this->status,
            ]);

            $this->notify('Enrollment created successfully.');
            $this->resetPage();
        }

        $this->closeForm();
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    public function openCertificate(int $id): void
    {
        $enrollment = Enrollment::with('course.subjects')->findOrFail($id);
        $this->certificateEnrollmentId = $enrollment->id;
        $this->grades = $enrollment->course->subjects->mapWithKeys(fn ($subject) => [$subject->id => ''])->all();
        $this->resetValidation('grades');
        $this->showCertificate = true;
    }

    public function closeCertificate(): void
    {
        $this->showCertificate = false;
        $this->certificateEnrollmentId = null;
        $this->grades = [];
        $this->resetValidation('grades');
    }

    public function generateCertificate()
    {
        $enrollment = Enrollment::with(['student', 'course.subjects'])->findOrFail($this->certificateEnrollmentId);
        $subjects = $enrollment->course->subjects;

        if ($subjects->isEmpty()) {
            $this->addError('grades', 'Add at least one subject to this course before generating a certificate.');
            return;
        }

        $this->validate([
            'grades' => ['required', 'array'],
            'grades.*' => ['required', 'in:A+,A,A-,B+,B,B-,C+,C,C-,D,F'],
        ]);

        foreach ($subjects as $subject) {
            if (empty($this->grades[$subject->id] ?? null)) {
                $this->addError('grades.' . $subject->id, 'Select a grade for this subject.');
                return;
            }
        }

        $pdf = Pdf::loadView('certificates.certificate', [
            'enrollment' => $enrollment,
            'subjects' => $subjects,
            'grades' => $this->grades,
            'certificateDate' => now(),
        ])->setPaper('a4', 'landscape');

        return response()->streamDownload(
            fn () => print($pdf->output()),
            'certificate-' . $enrollment->student->id . '-' . $enrollment->course->id . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    private function rules(): array
    {
        return [
            'student_id'  => ['required', 'integer', 'exists:students,id'],
            'course_id'   => ['required', 'integer', 'exists:courses,id'],
            'enrolled_at' => ['required', 'date'],
            'status'      => ['required', 'in:active,completed,cancelled'],
        ];
    }

    private function guardDuplicate(): void
    {
        $exists = DB::table('course_student')
            ->where('student_id', $this->student_id)
            ->where('course_id', $this->course_id)
            ->when($this->editingId, fn ($q) => $q->where('id', '!=', $this->editingId))
            ->exists();

        if ($exists) {
            $this->addError('course_id', 'This student is already enrolled in this course.');
            throw ValidationException::withMessages([
                'course_id' => 'This student is already enrolled in this course.',
            ]);
        }
    }

    private function resetForm(): void
    {
        $this->student_id  = '';
        $this->course_id   = '';
        $this->enrolled_at = '';
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
        $enrollments = Enrollment::query()
            ->with(['student', 'course'])
            ->when($this->search, function ($q) {
                $term = '%' . $this->search . '%';
                $q->whereHas('student', function ($q2) use ($term) {
                    $q2->where('name', 'like', $term)
                       ->orWhere('email', 'like', $term)
                       ->orWhere('phone', 'like', $term);
                })->orWhereHas('course', function ($q2) use ($term) {
                    $q2->where('name', 'like', $term);
                });
            })
            ->when($this->statusFilter, fn ($q) => $q->where('status', $this->statusFilter))
            ->when($this->courseFilter, fn ($q) => $q->where('course_id', $this->courseFilter))
            ->latest('enrolled_at')
            ->paginate($this->perPage);

        $viewEnrollment = $this->viewingId
            ? Enrollment::with(['student.courses', 'course.students'])->find($this->viewingId)
            : null;

        $students = Student::orderBy('name')->get(['id', 'name', 'email']);
        $courses  = Course::orderBy('name')->get(['id', 'name']);

        $certificateEnrollment = $this->certificateEnrollmentId ? Enrollment::with(['student', 'course.subjects'])->find($this->certificateEnrollmentId) : null;

        return view('livewire.admin.enrollments', compact(
            'enrollments',
            'viewEnrollment',
            'students',
            'courses',
            'certificateEnrollment',
        ));
    }
}
