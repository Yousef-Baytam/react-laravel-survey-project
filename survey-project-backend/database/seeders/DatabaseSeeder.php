<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question_type;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Question_type::create([
            'question_type' => 'Single Line'
        ]);
        Question_type::create([
            'question_type' => 'MCQ'
        ]);
        Question_type::create([
            'question_type' => 'Drop Down'
        ]);
        Question_type::create([
            'question_type' => 'Checkbox'
        ]);
    }
}
