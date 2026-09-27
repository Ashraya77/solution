<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicEnrollmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_courses_are_available_for_the_public_form(): void
    {
        $active = Course::create(['name' => 'Computer Basics', 'slug' => 'computer-basics', 'status' => 'active']);
        Course::create(['name' => 'Legacy Course', 'slug' => 'legacy-course', 'status' => 'inactive']);

        $this->getJson('/api/courses')
            ->assertOk()
            ->assertJsonPath('data.0.id', $active->id)
            ->assertJsonCount(1, 'data');
    }

    public function test_a_public_enrollment_creates_a_student_and_enrollment(): void
    {
        $course = Course::create(['name' => 'Computer Basics', 'slug' => 'computer-basics', 'status' => 'active']);

        $this->postJson('/api/enrollments', [
            'name' => 'Sita Rai',
            'father_name' => 'Ram Rai',
            'email' => 'sita@example.test',
            'phone' => '9800000000',
            'address' => 'Pokhara',
            'date_of_birth' => '2000-01-01',
            'course_id' => $course->id,
        ])
            ->assertCreated()
            ->assertJsonPath('message', 'Your enrollment has been submitted successfully.')
            ->assertJsonPath('data.course_id', $course->id);

        $student = Student::where('email', 'sita@example.test')->firstOrFail();

        $this->assertSame('Ram Rai', $student->father_name);
        $this->assertDatabaseHas('course_student', [
            'student_id' => $student->id,
            'course_id' => $course->id,
            'status' => 'active',
        ]);
    }

    public function test_an_inactive_course_cannot_receive_a_public_enrollment(): void
    {
        $course = Course::create(['name' => 'Legacy Course', 'slug' => 'legacy-course', 'status' => 'inactive']);

        $this->postJson('/api/enrollments', [
            'name' => 'Sita Rai',
            'phone' => '9800000000',
            'course_id' => $course->id,
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('course_id');

        $this->assertDatabaseCount('students', 0);
    }
}
