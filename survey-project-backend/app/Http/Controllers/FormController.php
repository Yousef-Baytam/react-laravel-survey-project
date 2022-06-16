<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;

class FormController extends Controller
{
    public function getAllForms()
    {
        $surveys = Survey::with('questions')->get();
        $questions = Question::with('values')->with('question_types')->with('surveys')->get();
        return response()->json([
            "status" => "Success",
            "surveys" => $surveys,
            "questions" => $questions
        ], 200);
    }
}
