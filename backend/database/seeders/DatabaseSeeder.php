<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'solution@gmail.com'],
            [
                'name' => 'Solution',
                'password' => Hash::make('pokhara25'),
            ],
        );
    }
}