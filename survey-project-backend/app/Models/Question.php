<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $table = 'questions';

    public function answers()
    {
        return $this->hasMany(Answer::class, 'questions_id', 'id');
    }

    public function values()
    {
        return $this->hasMany(Value::class, 'question_id', 'id');
    }

    public function question_types()
    {
        return $this->belongsTo(Question_type::class, 'question_type_id', 'id');
    }
}
