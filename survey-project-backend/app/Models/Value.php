<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'qeustion_id'
    ];

    protected $table = 'values';

    public function question_types()
    {
        return $this->belongsTo(Question::class, 'question_id', 'id');
    }
}
