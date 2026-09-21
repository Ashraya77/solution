<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['student_id', 'course_id', 'exam_code', 'course_name', 'course_start', 'course_end', 'marks', 'average', 'total_grade', 'issued_on'])]
class Certificate extends Model
{
    use HasFactory;

    public const GRADES = [80 => 'A+', 60 => 'A', 45 => 'B', 35 => 'C', 0 => 'D'];

    protected function casts(): array
    {
        return [
            'marks' => 'array',
            'course_start' => 'date',
            'course_end' => 'date',
            'issued_on' => 'date',
            'average' => 'decimal:2',
        ];
    }

    public static function gradeFor(float $percent): string
    {
        foreach (self::GRADES as $minimum => $grade) {
            if ($percent >= $minimum) {
                return $grade;
            }
        }

        return self::GRADES[0];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
