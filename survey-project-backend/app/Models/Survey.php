<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'descrition',
        'is_open',
    ];

    protected $table = 'surveys';

    public function questions()
    {
        return $this->hasMany(Question::class, 'surveys_id', 'id');
    }
}
