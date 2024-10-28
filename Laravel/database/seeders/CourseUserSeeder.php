<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
 
class CourseUserSeeder extends Seeder
{
    public function run()
    {
        // Dohvatamo sve studente i kurseve
        $students = User::where('role', 'student')->pluck('id')->toArray();
        $courses = Course::pluck('id')->toArray();

        // Kreiramo 20 random zapisa u pivot tabeli
        for ($i = 0; $i < 20; $i++) {
            DB::table('course_users')->insert([
                'user_id' => $students[array_rand($students)],
                'course_id' => $courses[array_rand($courses)],
                'datum_upisa' => now()->subDays(rand(1, 30)), // Random datum unutar proteklih 30 dana
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
