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
}
