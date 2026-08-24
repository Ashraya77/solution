<?php

namespace App\Livewire\Admin;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;

#[Layout('layouts.admin')]
#[Title('Dashboard')]
class Dashboard extends Component
{
    public int $totalStudents    = 0;
    public int $totalCourses     = 0;
    public int $totalEnrollments = 0;

    public function mount(): void
    {
        $this->totalStudents    = Student::count();
        $this->totalCourses     = Course::count();
        $this->totalEnrollments = DB::table('course_student')->count();
    }

    public function render()
    {
        $recentStudents = Student::latest()->limit(5)->get();

        return view('livewire.admin.dashboard', compact('recentStudents'));
    }
}
