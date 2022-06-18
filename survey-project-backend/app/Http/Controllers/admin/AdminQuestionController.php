<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Question_type;
use App\Models\Value;

class AdminQuestionController extends Controller
{

    public function addQuestion(Request $request, $id)
    {
        $question = Question::create([
            'question' => $request->question,
            'surveys_id' => $id,
            'question_type_id' => Question_type::where('question_type', $request->question_type)->get()[0]->id,
        ]);

        return response()->json([
            "status" => "Success",
            "question" => $question
        ], 200);
    }

    public function updateQuestion(Request $request, $id)
    {
        $question =  Question::find($id)->update([
            'question' => $request->question,
            'surveys_id' => $id,
            'question_type_id' => $request->question_type_id
        ]);

        return response()->json([
            "status" => "Success",
            "res" => $question
        ], 200);
    }

    public function deleteQuestion($id)
    {
        $values = Question::where('id', $id)->with('values')->get();
        Question::find($id)->delete();
        foreach ($values[0]->values as $i)
            Value::find($i->id)->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
