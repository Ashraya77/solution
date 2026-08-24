<?php

use App\Livewire\Login;
use App\Livewire\Admin\Courses;
use App\Livewire\Admin\Dashboard;
use App\Livewire\Admin\Enrollments;
use App\Livewire\Admin\Students;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
});

// Authentication routes
Route::get('/login', Login::class)->name('login')->middleware('guest');

Route::post('/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect()->route('login');
})->name('logout')->middleware('auth');

// Admin routes — protected by auth middleware
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', Dashboard::class)->name('dashboard');

    // Placeholder routes — CRUD to be built later
    Route::get('/students', Students::class)->name('students');
    Route::get('/courses', Courses::class)->name('courses');
    Route::get('/enrollments', Enrollments::class)->name('enrollments');
});
