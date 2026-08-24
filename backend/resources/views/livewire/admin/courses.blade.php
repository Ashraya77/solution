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
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        {{-- Search --}}
        <div class="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
                wire:model.live.debounce.300ms="search"
                type="search"
                placeholder="Search by course name…"
                class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
        </div>

        {{-- Status filter --}}
        <select
            wire:model.live="statusFilter"
            class="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
        </select>

        {{-- Add course --}}
        <button
            wire:click="openCreate"
            class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Course
        </button>
    </div>

    {{-- ═══════════════════════ TABLE ══════════════════════════════════════ --}}
    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200 text-left">
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Name</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Duration</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Price</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Students</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    @forelse ($courses as $course)
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-5 py-3.5">
                                <div>
                                    <button wire:click="openView({{ $course->id }})" class="font-medium text-gray-800 hover:text-indigo-600 text-left transition-colors">
                                        {{ $course->name }}
                                    </button>
                                    <p class="text-xs text-gray-400 mt-0.5">{{ $course->slug }}</p>
                                </div>
                            </td>
                            <td class="px-5 py-3.5 text-gray-600 hidden sm:table-cell">
                                {{ $course->duration ?? '—' }}
                            </td>
                            <td class="px-5 py-3.5 text-gray-600 hidden md:table-cell">
                                @if ($course->price !== null)
                                    <span class="font-medium text-gray-800">{{ number_format($course->price, 2) }}</span>
                                @else
                                    <span class="text-gray-400">—</span>
                                @endif
                            </td>
                            <td class="px-5 py-3.5 hidden lg:table-cell">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                    {{ $course->students_count }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    {{ $course->status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500' }}">
                                    {{ ucfirst($course->status) }}
                                </span>
                            </td>
                            <td class="px-5 py-3.5 text-right whitespace-nowrap">
                                <button
                                    wire:click="openView({{ $course->id }})"
                                    class="text-gray-400 hover:text-indigo-600 p-1 rounded transition-colors"
                                    title="View"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    wire:click="openEdit({{ $course->id }})"
                                    class="text-gray-400 hover:text-amber-600 p-1 rounded transition-colors"
                                    title="Edit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    wire:click="confirmDelete({{ $course->id }})"
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
                            <td colspan="6" class="px-5 py-12 text-center text-gray-400 text-sm">
                                @if ($search || $statusFilter)
                                    No courses match your search.
                                @else
                                    No courses yet. Add your first course.
                                @endif
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if ($courses->hasPages())
            <div class="px-5 py-3 border-t border-gray-200">
                {{ $courses->links() }}
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
                        {{ $editingId ? 'Edit Course' : 'Add Course' }}
                    </h2>
                    <button wire:click="closeForm" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form wire:submit="save" class="px-6 py-5 space-y-4" novalidate>

                    {{-- Name --}}
                    <div>
                        <label for="course-name" class="block text-sm font-medium text-gray-700 mb-1">
                            Course Name <span class="text-red-500">*</span>
                        </label>
                        <input
                            id="course-name"
                            type="text"
                            wire:model="name"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('name') ? 'border-red-400' : 'border-gray-300' }}"
                            autocomplete="off"
                        >
                        @error('name') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                        <p class="text-xs text-gray-400 mt-1">Slug will be generated automatically.</p>
                    </div>

                    {{-- Duration --}}
                    <div>
                        <label for="course-duration" class="block text-sm font-medium text-gray-700 mb-1">
                            Duration <span class="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                            id="course-duration"
                            type="text"
                            wire:model="duration"
                            placeholder="e.g. 3 months, 40 hours"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('duration') ? 'border-red-400' : 'border-gray-300' }}"
                            autocomplete="off"
                        >
                        @error('duration') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Price --}}
                    <div>
                        <label for="course-price" class="block text-sm font-medium text-gray-700 mb-1">
                            Price <span class="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <input
                            id="course-price"
                            type="number"
                            wire:model="price"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('price') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                        @error('price') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Description --}}
                    <div>
                        <label for="course-description" class="block text-sm font-medium text-gray-700 mb-1">
                            Description <span class="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            id="course-description"
                            wire:model="description"
                            rows="3"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('description') ? 'border-red-400' : 'border-gray-300' }}"
                        ></textarea>
                        @error('description') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
                    </div>

                    {{-- Status --}}
                    <div>
                        <label for="course-status" class="block text-sm font-medium text-gray-700 mb-1">
                            Status <span class="text-red-500">*</span>
                        </label>
                        <select
                            id="course-status"
                            wire:model="status"
                            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                   {{ $errors->has('status') ? 'border-red-400' : 'border-gray-300' }}"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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
                            {{ $editingId ? 'Save Changes' : 'Add Course' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    @endif

    {{-- ═══════════════════════ VIEW MODAL ════════════════════════════════ --}}
    @if ($showView && $viewCourse)
        <div
            class="fixed inset-0 z-40 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-modal-title"
        >
            <div class="absolute inset-0 bg-black/40" wire:click="closeView"></div>

            <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 id="view-modal-title" class="text-base font-semibold text-gray-800">Course Details</h2>
                    <button wire:click="closeView" class="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="px-6 py-5 space-y-4">
                    {{-- Title + status --}}
                    <div class="flex items-start gap-3">
                        <div class="flex-shrink-0 w-11 h-11 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 text-base">{{ $viewCourse->name }}</p>
                            <p class="text-xs text-gray-400 mt-0.5">{{ $viewCourse->slug }}</p>
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1
                                {{ $viewCourse->status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500' }}">
                                {{ ucfirst($viewCourse->status) }}
                            </span>
                        </div>
                    </div>

                    {{-- Details grid --}}
                    <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                        <div>
                            <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Duration</dt>
                            <dd class="text-gray-800">{{ $viewCourse->duration ?? '—' }}</dd>
                        </div>
                        <div>
                            <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Price</dt>
                            <dd class="text-gray-800 font-medium">
                                {{ $viewCourse->price !== null ? number_format($viewCourse->price, 2) : '—' }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Created</dt>
                            <dd class="text-gray-800">{{ $viewCourse->created_at->format('d M Y') }}</dd>
                        </div>
                        <div>
                            <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Last updated</dt>
                            <dd class="text-gray-800">{{ $viewCourse->updated_at->format('d M Y') }}</dd>
                        </div>
                        @if ($viewCourse->description)
                            <div class="col-span-2">
                                <dt class="text-gray-500 text-xs font-medium uppercase tracking-wide mb-0.5">Description</dt>
                                <dd class="text-gray-700 leading-relaxed">{{ $viewCourse->description }}</dd>
                            </div>
                        @endif
                    </dl>

                    {{-- Enrolled students --}}
                    <div>
                        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                            Enrolled Students ({{ $viewCourse->students->count() }})
                        </h3>
                        @if ($viewCourse->students->isEmpty())
                            <p class="text-sm text-gray-400">No students enrolled yet.</p>
                        @else
                            <ul class="divide-y divide-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                                @foreach ($viewCourse->students as $student)
                                    <li class="px-4 py-2.5 flex items-center justify-between gap-3 text-sm">
                                        <div class="min-w-0">
                                            <p class="font-medium text-gray-800 truncate">{{ $student->name }}</p>
                                            @if ($student->email)
                                                <p class="text-xs text-gray-400 truncate">{{ $student->email }}</p>
                                            @endif
                                        </div>
                                        <div class="flex items-center gap-2 flex-shrink-0">
                                            <span class="text-xs text-gray-400">{{ $student->pivot->enrolled_at?->format('d M Y') }}</span>
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                                {{ match($student->pivot->status) {
                                                    'active'    => 'bg-emerald-50 text-emerald-700',
                                                    'completed' => 'bg-blue-50 text-blue-700',
                                                    default     => 'bg-gray-100 text-gray-500',
                                                } }}">
                                                {{ ucfirst($student->pivot->status) }}
                                            </span>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>

                    <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
                        <button
                            wire:click="openEdit({{ $viewCourse->id }})"
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
                        <h2 id="delete-modal-title" class="text-base font-semibold text-gray-800 mb-1">Delete Course</h2>
                        <p class="text-sm text-gray-500">This will permanently delete the course and all its enrollment records. This action cannot be undone.</p>
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
                        wire:click="deleteCourse"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    @endif

</div>
