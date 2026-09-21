<?php

namespace Tests\Feature;

use App\Livewire\Admin\Students;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class StudentsPhotoTest extends TestCase
{
    use RefreshDatabase;

    public function test_student_photo_is_stored_replaced_and_deleted_with_its_student(): void
    {
        Storage::fake('public');

        $course = Course::create([
            'name' => 'Computer Basics',
            'slug' => 'computer-basics',
            'status' => 'active',
        ]);

        Livewire::test(Students::class)
            ->set('name', 'Sita Rai')
            ->set('father_name', 'Ram Rai')
            ->set('email', 'sita@example.test')
            ->set('registration_no', 'REG-001')
            ->set('phone', '9800000000')
            ->set('date_of_birth', '2000-01-01')
            ->set('dob_bs', '2056/09/17')
            ->set('courseIds', [$course->id])
            ->set('photo', $this->imageFile('original.gif'))
            ->call('save')
            ->assertHasNoErrors();

        $student = Student::firstOrFail();
        $originalPhoto = $student->photo;

        $this->assertSame('Ram Rai', $student->father_name);
        $this->assertSame('REG-001', $student->registration_no);
        $this->assertSame('2056/09/17', $student->dob_bs);
        $this->assertStringStartsWith('students/', $originalPhoto);
        Storage::disk('public')->assertExists($originalPhoto);

        Livewire::test(Students::class)
            ->call('openView', $student->id)
            ->assertSee('Ram Rai')
            ->assertSee('REG-001')
            ->assertSee('2056/09/17')
            ->assertSee('Sita Rai photo');

        Livewire::test(Students::class)
            ->call('openEdit', $student->id)
            ->assertSet('currentPhoto', $originalPhoto)
            ->set('photo', $this->imageFile('replacement.gif'))
            ->call('save')
            ->assertHasNoErrors();

        $replacementPhoto = $student->fresh()->photo;

        $this->assertNotSame($originalPhoto, $replacementPhoto);
        Storage::disk('public')->assertMissing($originalPhoto);
        Storage::disk('public')->assertExists($replacementPhoto);

        Livewire::test(Students::class)
            ->set('deletingId', $student->id)
            ->call('deleteStudent');

        $this->assertNull(Student::find($student->id));
        Storage::disk('public')->assertMissing($replacementPhoto);
    }

    private function imageFile(string $name): UploadedFile
    {
        return UploadedFile::fake()->createWithContent($name, base64_decode('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='));
    }
}
