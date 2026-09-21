<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'father_name', 'email', 'registration_no', 'phone', 'address', 'photo', 'date_of_birth', 'dob_bs', 'status'])]
class Student extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
        ];
    }

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_student')
            ->withPivot(['id', 'enrolled_at', 'status'])
            ->withTimestamps()
            ->using(Enrollment::class);
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(Certificate::class);
    }
}
