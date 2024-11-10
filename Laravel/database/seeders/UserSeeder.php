<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create(); 

        User::create([
            'name' => 'Student User',
            'email' => 'student@gmail.com',
            'password' => bcrypt('student'),
            'role' => 'student',
            'datum_rodjenja' => '2000-01-01'
        ]);

        User::create([
            'name' => 'Teacher User',
            'email' => 'teacher@gmail.com',
            'password' => bcrypt('teacher'),
            'role' => 'teacher',
            'datum_rodjenja' => '1990-01-01' 
        ]);
    }
}
