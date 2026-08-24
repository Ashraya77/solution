<div>

    {{-- ═══════════════════════ FLASH NOTIFICATION ═══════════════════════ --}}
    @if ($flash)
        <div
            x-data="{ show: true }"
            x-show="show"
            x-init="setTimeout(() => { show = false; $wire.dismissFlash() }, 4000)"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-2"
            x-transition:enter-end="opacity-100 translate-y-0"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            class="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium
                   {{ $flashType === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white' }}"
            role="alert"
        >
            @if ($flashType === 'success')
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            @else
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            @endif
            {{ $flash }}
            <button wire:click="dismissFlash" @click="show = false" class="ml-1 opacity-70 hover:opacity-100" aria-label="Dismiss">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    @endif

    {{-- ═══════════════════════ TOOLBAR ═══════════════════════════════════ --}}
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-5 flex-wrap">
        {{-- Search --}}
        <div class="relative flex-1 min-w-48">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
                wire:model.live.debounce.300ms="search"
                type="search"
                placeholder="Search student or course…"
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
        </div>

        {{-- Course filter --}}
        <select
            wire:model.live="courseFilter"
            class="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">All courses</option>
            @foreach ($courses as $course)
                <option value="{{ $course->id }}">{{ $course->name }}</option>
            @endforeach
        </select>

        {{-- Status filter --}}
        <select
            wire:model.live="statusFilter"
            class="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
        </select>

        {{-- New enrollment --}}
        <button
            wire:click="openCreate"
            class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 whitespace-nowrap"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Enrollment
        </button>
    </div>

    {{-- ═══════════════════════ TABLE ══════════════════════════════════════ --}}
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200 text-left">
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Course</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Enrolled Date</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse ($enrollments as $enrollment)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-5 py-3.5">
                                <button wire:click="openView({{ $enrollment->id }})" class="text-left">
                                    <p class="font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                                        {{ $enrollment->student->name }}
                                    </p>
                                    @if ($enrollment->student->email)
                                        <p class="text-xs text-gray-400 mt-0.5">{{ $enrollment->student->email }}</p>
                                    @else
                                        <p class="text-xs text-gray-400 mt-0.5">{{ $enrollment->student->phone }}</p>
                                    @endif
                                </button>
                            </td>
                            <td class="px-5 py-3.5 hidden sm:table-cell">
                                <p class="text-gray-700 font-medium">{{ $enrollment->course->name }}</p>
                                @if ($enrollment->course->duration)
                                    <p class="text-xs text-gray-400 mt-0.5">{{ $enrollment->course->duration }}</p>
                                @endif
                            </td>
                            <td class="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell">
                                {{ $enrollment->enrolled_at->format('d M Y, H:i') }}
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    {{ match($enrollment->status) {
                                        'active'    => 'bg-emerald-50 text-emerald-700',
                                        'completed' => 'bg-blue-50 text-blue-700',
                                        default     => 'bg-gray-100 text-gray-500',
                                    } }}">
                                    {{ ucfirst($enrollment->status) }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5 text-right whitespace-nowrap">
                                <button
                                    wire:click="openView({{ $enrollment->id }})"
                                    class="text-gray-400 hover:text-indigo-600 p-1 rounded transition-colors"
                                    title="View"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    wire:click="openEdit({{ $enrollment->id }})"
                                    class="text-gray-400 hover:text-amber-600 p-1 rounded transition-colors"
                                    title="Edit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    wire:click="confirmDelete({{ $enrollment->id }})"
                                    class="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                                    title="Delete"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="px-5 py-12 text-center text-gray-400 text-sm">
                                @if ($search || $statusFilter || $courseFilter)
                                    No enrollments match your filters.
                                @else
                                    No enrollments yet. Create the first one.
                                @endif
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if ($enrollments->hasPages())
            <div class="px-5 py-3 border-t border-gray-200">
                {{ $enrollments->links() }}
            </div>
        @endif
    </div>

    {{-- ═══════════════════════ ADD / EDIT MODAL ══════════════════════════ --}}
    @if ($showForm)
        <div
            class="fixed inset-0 z-40 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-modal-title"
        >
            <div class="absolute inset-0 bg-black/40" wire:click="closeForm"></div>

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 id="form-modal-title" class="text-base font-semibold text-gray-800">
                        {{ $editingId ? 'Edit Enrollment' : 'New Enrollment' }}
                    </h2>
                    <button wire:click="closeForm" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form wire:submit="save" class="px-6 py-5 space-y-4" novalidate>

                    {{-- Student --}}
                    <div>
                        <label for="enrollment-student" class="block text-sm font-medium text-gray-700 mb-1">
                            Student <span class="text-red-500">*</span>
                        </label>
                        <select
                            id="enrollment-student"
                            wire:model="student_id"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('student_id') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                            <option value="">— Select a student —</option>
                            @foreach ($students as $student)
                                <option value="{{ $student->id }}">
                                    {{ $student->name }}{{ $student->email ? ' (' . $student->email . ')' : '' }}
                                </option>
                            @endforeach
                        </select>
                        @error('student_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Course --}}
                    <div>
                        <label for="enrollment-course" class="block text-sm font-medium text-gray-700 mb-1">
                            Course <span class="text-red-500">*</span>
                        </label>
                        <select
                            id="enrollment-course"
                            wire:model="course_id"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('course_id') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                            <option value="">— Select a course —</option>
                            @foreach ($courses as $course)
                                <option value="{{ $course->id }}">{{ $course->name }}</option>
                            @endforeach
                        </select>
                        @error('course_id') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Enrolled at --}}
                    <div>
                        <label for="enrollment-date" class="block text-sm font-medium text-gray-700 mb-1">
                            Enrolled Date <span class="text-red-500">*</span>
                        </label>
                        <input
                            id="enrollment-date"
                            type="datetime-local"
                            wire:model="enrolled_at"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('enrolled_at') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                        @error('enrolled_at') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Status --}}
                    <div>
                        <label for="enrollment-status" class="block text-sm font-medium text-gray-700 mb-1">
                            Status <span class="text-red-500">*</span>
                        </label>
                        <select
                            id="enrollment-status"
                            wire:model="status"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('status') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        @error('status') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Actions --}}
                    <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            type="button"
                            wire:click="closeForm"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {{ $editingId ? 'Save Changes' : 'Enroll' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    @endif

    {{-- ═══════════════════════ VIEW MODAL ════════════════════════════════ --}}
    @if ($showView && $viewEnrollment)
        <div
            class="fixed inset-0 z-40 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-modal-title"
        >
            <div class="absolute inset-0 bg-black/40" wire:click="closeView"></div>

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 id="view-modal-title" class="text-base font-semibold text-gray-800">Enrollment Details</h2>
                    <button wire:click="closeView" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="px-6 py-5 space-y-5">

                    {{-- Enrollment summary --}}
                    <div class="bg-gray-50 rounded-lg p-4">
                        <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                            <div class="col-span-2">
                                <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Enrolled Date</dt>
                                <dd class="text-gray-800 font-medium">{{ $viewEnrollment->enrolled_at->format('d M Y, H:i') }}</dd>
                            </div>
                            <div class="col-span-2">
                                <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Status</dt>
                                <dd>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        {{ match($viewEnrollment->status) {
                                            'active'    => 'bg-emerald-50 text-emerald-700',
                                            'completed' => 'bg-blue-50 text-blue-700',
                                            default     => 'bg-gray-100 text-gray-500',
                                        } }}">
                                        {{ ucfirst($viewEnrollment->status) }}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {{-- Student details --}}
                    <div>
                        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Student</h3>
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold uppercase flex-shrink-0">
                                {{ substr($viewEnrollment->student->name, 0, 1) }}
                            </div>
                            <div class="min-w-0">
                                <p class="font-medium text-gray-800">{{ $viewEnrollment->student->name }}</p>
                                <p class="text-xs text-gray-500">{{ $viewEnrollment->student->email ?? $viewEnrollment->student->phone }}</p>
                            </div>
                        </div>

                        @php $otherCourses = $viewEnrollment->student->courses->where('id', '!=', $viewEnrollment->course_id); @endphp
                        @if ($otherCourses->isNotEmpty())
                            <p class="text-xs text-gray-500 mb-1">Also enrolled in:</p>
                            <ul class="space-y-1">
                                @foreach ($otherCourses as $c)
                                    <li class="flex items-center justify-between text-sm bg-gray-50 rounded px-3 py-1.5">
                                        <span class="text-gray-700">{{ $c->name }}</span>
                                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                            {{ match($c->pivot->status) {
                                                'active'    => 'bg-emerald-50 text-emerald-700',
                                                'completed' => 'bg-blue-50 text-blue-700',
                                                default     => 'bg-gray-100 text-gray-500',
                                            } }}">
                                            {{ ucfirst($c->pivot->status) }}
                                        </span>
                                    </li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-xs text-gray-400">Not enrolled in any other courses.</p>
                        @endif
                    </div>

                    {{-- Course details --}}
                    <div>
                        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Course</h3>
                        <div class="bg-gray-50 rounded-lg p-3 mb-3">
                            <p class="font-medium text-gray-800">{{ $viewEnrollment->course->name }}</p>
                            @if ($viewEnrollment->course->duration)
                                <p class="text-xs text-gray-500 mt-0.5">{{ $viewEnrollment->course->duration }}</p>
                            @endif
                            @if ($viewEnrollment->course->description)
                                <p class="text-xs text-gray-500 mt-1 leading-relaxed">{{ \Illuminate\Support\Str::limit($viewEnrollment->course->description, 120) }}</p>
                            @endif
                        </div>

                        @php $otherStudents = $viewEnrollment->course->students->where('id', '!=', $viewEnrollment->student_id); @endphp
                        @if ($otherStudents->isNotEmpty())
                            <p class="text-xs text-gray-500 mb-1">Other students in this course ({{ $otherStudents->count() }}):</p>
                            <ul class="space-y-1 max-h-36 overflow-y-auto">
                                @foreach ($otherStudents as $s)
                                    <li class="flex items-center gap-2 text-sm bg-gray-50 rounded px-3 py-1.5">
                                        <div class="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">
                                            {{ substr($s->name, 0, 1) }}
                                        </div>
                                        <span class="text-gray-700 truncate">{{ $s->name }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        @else
                            <p class="text-xs text-gray-400">No other students in this course.</p>
                        @endif
                    </div>

                    <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            wire:click="openEdit({{ $viewEnrollment->id }})"
                            @click="$wire.closeView()"
                            class="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            wire:click="closeView"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    @endif

    {{-- ═══════════════════════ DELETE CONFIRM MODAL ══════════════════════ --}}
    @if ($showDeleteConfirm)
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >
            <div class="absolute inset-0 bg-black/40" wire:click="cancelDelete"></div>

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 id="delete-modal-title" class="text-base font-semibold text-gray-800 mb-1">Delete Enrollment</h2>
                        <p class="text-sm text-gray-500">This will permanently remove this enrollment record. The student and course will not be affected.</p>
                    </div>
                </div>
                <div class="flex justify-end gap-3 mt-6">
                    <button
                        wire:click="cancelDelete"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        wire:click="deleteEnrollment"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    @endif

</div>
