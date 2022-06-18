<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Mdoels\Question;

class AdminFormController extends Controller
{
    public function addForm(Request $request)
    {
        $survey = Survey::create([
            'name' => $request->name,
            'description' => $request->description,
            'is_open' => true,
        ]);

        return response()->json([
            "status" => "Success",
            "survey" => $survey
        ], 200);
    }

    public function updateForm(Request $request, $id)
    {
        $users = Survey::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
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
