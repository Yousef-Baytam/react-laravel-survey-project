<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'answer',
        'users_id',
        'questions_id',
        'questions_surveys_id',
    ];

    protected $table = 'answers';

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function questions()
    {
        return $this->belongsTo(Question::class, 'questions_id', 'id');
    }

    public function surveys()
    {
        return $this->belongsTo(Survey::class, 'questions_surveys_id', 'id');
    }
}
