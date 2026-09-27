<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class EnrollmentController extends Controller
{
    public function courses(): JsonResponse
    {
        $courses = Course::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'description', 'duration', 'price']);

        return response()->json(['data' => $courses]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', Rule::unique('students', 'email')],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:500'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'course_id' => ['required', 'integer', Rule::exists('courses', 'id')->where('status', 'active')],
        ]);

        $student = DB::transaction(function () use ($validated): Student {
            $student = Student::create([
                'name' => $validated['name'],
                'father_name' => $validated['father_name'] ?? null,
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'],
                'address' => $validated['address'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'status' => 'active',
            ]);

            $student->courses()->attach($validated['course_id'], [
                'enrolled_at' => now(),
                'status' => 'active',
            ]);

            return $student;
        });

        return response()->json([
            'message' => 'Your enrollment has been submitted successfully.',
            'data' => ['student_id' => $student->id, 'course_id' => $validated['course_id']],
        ], 201);
    }
}
