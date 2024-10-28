<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseUser extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'course_id',
        'datum_upisa',
    ];

    public $timestamps = true; 

    protected $casts = [
        'datum_upisa' => 'date',
    ];
}
