<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CourseUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseUserController extends Controller
{
    public function index()
    {
        $courseUsers = CourseUser::with('course', 'user')->get();
        return response()->json($courseUsers, 200);
    }
    /// napravi mi za studenta da vrati njegov kurs
    public function show($id)
    {
        $courseUser = CourseUser::with('course', 'user')->findOrFail($id);
        return response()->json($courseUser, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $courseUser = CourseUser::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'datum_upisa' => now(), 
        ]);
    
        return response()->json($courseUser, 201);
    }

    public function update(Request $request, $id)
    {
        $courseUser = CourseUser::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'datum_upisa' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $courseUser->update($request->all());
        return response()->json($courseUser, 200);
    }

    public function destroy($id)
    {
        $courseUser = CourseUser::findOrFail($id);
        $courseUser->delete();

        return response()->json(['message' => 'CourseUser deleted successfully'], 200);
    }
}

