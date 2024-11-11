<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseUserController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Rute za neulogovanog korisnika
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/courses', [CourseController::class, 'index']);


// Rute za ulogovanog
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/sviKlipoviKursa/{id}', [CourseController::class, 'getCourseVideos'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/courses/{id}', [CourseController::class, 'show'])->middleware('role:teacher');
    Route::get('/my-courses', [CourseController::class, 'myCourses'])->middleware('role:student');
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:teacher');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware('role:teacher');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('role:teacher');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('videos', VideoController::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('course-users', CourseUserController::class);
});

Route::post('/courses/add-student', [CourseController::class, 'addStudentToCourse'])->middleware(['auth:sanctum', 'role:teacher']);


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});

Route::get('/teachers', [UserController::class, 'getTeachers'])->middleware('auth:sanctum');
