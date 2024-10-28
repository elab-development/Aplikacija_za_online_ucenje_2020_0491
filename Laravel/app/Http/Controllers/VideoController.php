<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::with('course')->get();
        return response()->json($videos, 200);
    }

    public function show($id)
    {
        $video = Video::with('course')->findOrFail($id);
        return response()->json($video, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'link' => 'required|url',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $video = Video::create($request->all());
        return response()->json($video, 201);
    }

    public function update(Request $request, $id)
    {
        $video = Video::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'link' => 'required|url',
            'course_id' => 'required|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $video->update($request->all());
        return response()->json($video, 200);
    }

    public function destroy($id)
    {
        $video = Video::findOrFail($id);
        $video->delete();

        return response()->json(['message' => 'Video deleted successfully'], 200);
    }
}