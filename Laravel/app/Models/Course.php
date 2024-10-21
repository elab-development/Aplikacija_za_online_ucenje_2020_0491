<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['title', 'description', 'teacher_id'];


    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}
