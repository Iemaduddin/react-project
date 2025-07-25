<?php

namespace Database\Seeders;

use App\Models\Organizer;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a Faker instance
        $faker = Faker::create();

        // Retrieve all organizers
        $organizers = Organizer::all();
        foreach ($organizers as $organizer) {
            if ($organizer->organizer_type !== 'Kampus' && $organizer->organizer_type !== 'Jurusan')
                for ($i = 0; $i < 5; $i++) {
                    TeamMember::create([
                        'organizer_id' => $organizer->id,
                        'nim' => rand(100000, 999999),
                        'name' => $faker->name,
                        'level' => $faker->randomElement(['SC', 'OC']), // Randomly select between 'SC' and 'OC'
                        'position' => $faker->jobTitle,
                        'is_leader' => $i == 0 ? true : false
                    ]);
                }
        }
    }
}