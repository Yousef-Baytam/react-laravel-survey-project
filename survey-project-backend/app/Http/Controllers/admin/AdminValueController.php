<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Value;

class AdminValueController extends Controller
{
    public function addValue(Request $request, $id)
    {
        Value::create([
            'value' => $request->value,
            'qeustion_id' => $id,
        ]);

        return response()->json([
            "status" => "Success",
        ], 200);
    }
}
