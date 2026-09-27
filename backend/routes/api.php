<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\EnrollmentController;

Route::post('/chat', [ChatController::class, 'chat']);Route::get('/courses', [EnrollmentController::class, 'courses']);
Route::post('/enrollments', [EnrollmentController::class, 'store'])->middleware('throttle:10,1');
