<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\Question;
use App\Models\Question_type;

class AdminQuestionController extends Controller
{

    public function addQuestion(Request $request, $id)
    {
        Question::create([
            'question' => $request->question,
            'surveys_id' => $id,
            'question_type_id' => Question_type::where('question_type', $request->question_type)->get()[0]->id
        ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function updateQuestion(Request $request, $id)
    {
        $question =  Question::find($id)->update([
            'question' => $request->question,
            'surveys_id' => $id,
            'question_type_id' => Question_type::where('question_type', $request->question_type)->get()[0]->id
        ]);

        return response()->json([
            "status" => "Success",
            "res" => $question
        ], 200);
    }
}
