<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use App\Models\Organizer;
use App\Models\Prodi;
use App\Models\Stakeholder;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StakeholderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // === Posisi tetap (tidak terhubung jurusan/organizer) ===
        $fixedPositions = [
            'Direktur',
            'Wakil Direktur I',
            'Wakil Direktur II',
            'Wakil Direktur III',
            'Wakil Direktur IV',
            'Presiden BEM',
        ];

        foreach ($fixedPositions as $position) {
            Stakeholder::create([
                'name' => $faker->name,
                'identifier' => $faker->numerify('############'),
                'type' => $position == 'Presiden BEM' ? 'mahasiswa' : 'dosen',
                'position' => $position,
                'is_active' => true,
                'jurusan_id' => null,
                'prodi_id' => null,
                'organizer_id' => null,
            ]);
        }

        // === Ketua Jurusan (satu per jurusan) ===
        $jurusanList = Jurusan::all();
        foreach ($jurusanList as $jurusan) {
            Stakeholder::create([
                'name' => $faker->name,
                'identifier' => $faker->numerify('############'),
                'type' => 'dosen',
                'position' => 'Ketua Jurusan',
                'is_active' => true,
                'jurusan_id' => $jurusan->id,
                'prodi_id' => null,
                'organizer_id' => null,
            ]);
        }
        // === Ketua Jurusan (satu per jurusan) ===
        $prodiList = Prodi::all();
        foreach ($prodiList as $prodi) {
            Stakeholder::create([
                'name' => $faker->name,
                'identifier' => $faker->numerify('############'),
                'type' => 'dosen',
                'position' => 'Ketua Prodi',
                'is_active' => true,
                'jurusan_id' => $prodi->jurusan_id,
                'prodi_id' => $prodi->id,
                'organizer_id' => null,
            ]);
        }

        // === DPK (berdasarkan organizer organizer_type = DPK) ===
        $dpkOrganizers = Organizer::all();
        foreach ($dpkOrganizers as $organizer) {
            if ($organizer->organizer_type !== "Kampus" && $organizer->organizer_type !== "Jurusan") {
                Stakeholder::create([
                    'name' => $faker->name,
                    'identifier' => $faker->numerify('############'),
                    'type' => 'dosen',
                    'position' => 'DPK',
                    'is_active' => true,
                    'jurusan_id' => null,
                    'prodi_id' => null,
                    'organizer_id' => $organizer->id,
                ]);
            }
        }
    }
}
