<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('teacher', 'videos')->get();
        return response()->json($courses, 200);
    }

    public function show($id)
    {
        $course = Course::with('teacher', 'videos')->findOrFail($id);
        return response()->json($course, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'teacher_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $course = Course::create($request->all());
        return response()->json($course, 201);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'teacher_id' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $course->update($request->all());
        return response()->json($course, 200);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }

    public function myCourses()
    {
        $userId = Auth::id();

        $courses = DB::table('courses')
            ->join('course_users', 'courses.id', '=', 'course_users.course_id')
            ->where('course_users.user_id', $userId)
            ->select('courses.id', 'courses.title')
            ->get();

        return response()->json($courses);
    }

    public function getCourseVideos($id)
    {
        $course = Course::with('videos')->findOrFail($id);
    
        return response()->json($course->videos);
    }

    public function addStudentToCourse(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'course_id' => 'required|exists:courses,id',
        ]);
        
        $student = User::where('email', $request->email)->where('role', 'student')->first();
    
        if (!$student) {
            return response()->json(['message' => 'Student sa unetim email-om ne postoji ili nema odgovarajuću ulogu.'], 404);
        }
    
        CourseUser::create([
            'user_id' => $student->id,
            'course_id' => $request->course_id,
            'datum_upisa' => now(),
        ]);
    
        return response()->json(['message' => 'Student uspešno dodat na kurs.'], 200);
    }
}
