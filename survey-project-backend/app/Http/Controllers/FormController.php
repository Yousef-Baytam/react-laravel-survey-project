<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Mdoels\Question;

class FormController extends Controller
{
    public function getAllForms()
    {
        $surveys = Survey::with('questions')->with('question_types')->get();
        return response()->json([
            "status" => "Success",
            "res" => $surveys
        ], 200);
    }

    public function addForm(Request $request)
    {
        Survey::create([
            'name' => $request->name,
            'descrition' => $request->descrition,
            'is_open' => true,
        ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }

    public function updateForm(Request $request, $id)
    {
        $users = Survey::find($id)->update([
            'name' => $request->name,
            'descrition' => $request->descrition,
            'is_open' => true,
        ]);

        return response()->json([
            "status" => "Success",
            "res" => $users
        ], 200);
    }

    public function deleteForm($id)
    {
        Survey::find($id)->delete();

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
