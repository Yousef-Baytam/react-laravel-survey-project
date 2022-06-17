<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;

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

    public function getAllAnsweredForms()
    {
        $answers = Answer::where('id', Auth::user()->id)->with('questions')->get();
        $questions = Question::with('values')->with('question_types')->with('surveys')->get();
        $final = [];
        foreach ($answers as $i) {
            foreach ($questions as $j) {
                if ($i->questions->id === $j->id) {
                    $i->question = $j;
                    array_push($final, $i);
                }
            }
        }
        return response()->json([
            "status" => "Success",
            "answers" => $final,
        ], 200);
    }

    public function answerForm($id, Request $request)
    {
        Answer::create([
            'answer' => $request->answer,
            'users_id' => Auth::user()->id,
            'questions_id' => $id,
            'questions_surveys_id' => Question::where('id', $id)->get()[0]->surveys_id,
        ]);
        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
