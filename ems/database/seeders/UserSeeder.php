<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Jurusan;
use App\Models\Organizer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'username' => 'simevasuper',
            'email' => 'superadmin.simeva@polinema.ac.id',
            'password' => Hash::make('password'),
            'category_user' => 'Internal Kampus',
        ]);

        $participantUser = User::create([
            'name' => 'Didin',
            'username' => 'didin',
            'email' => 'didin@email.com',
            'password' => Hash::make('password'),
            'category_user' => 'Eksternal Kampus',
        ]);

        $organizers = [[
            "Kampus" => [
                [
                    "name" => 'Perpustakaan Polinema',
                    "username_email" => 'perpus_polinema',
                    "shorten_name" => 'Perpus',
                ],
                [
                    "name" => 'AW Polinema',
                    "username_email" => 'aw_polinema',
                    "shorten_name" => 'AW',
                ],
                [
                    "name" => 'AA Polinema',
                    "username_email" => 'aa_polinema',
                    "shorten_name" => 'AA',
                ],
                [
                    "name" => 'AJ Polinema',
                    "username_email" => 'aj_polinema',
                    "shorten_name" => 'AJ',
                ],
            ],
            "Jurusan" => [
                [
                    "name" => 'Jurusan Teknologi Informasi',
                    "username_email" => 'jti_polinema',
                    "logo" => 'jti',
                    "shorten_name" => 'JTI',
                    "jurusan" => 'TI',
                ],
                [
                    "name" => 'Jurusan Akuntansi',
                    "username_email" => 'jak_polinema',
                    "logo" => 'j_akuntansi',
                    "shorten_name" => 'JAK',
                    "jurusan" => 'AK',
                ],
                [
                    "name" => 'Jurusan Teknik Mesin',
                    "username_email" => 'jtm_polinema',
                    "logo" => 'j_tm',
                    "shorten_name" => 'JTM',
                    "jurusan" => 'TM',
                ],
                [
                    "name" => 'Jurusan Teknik Elektro',
                    "username_email" => 'jte_polinema',
                    "logo" => 'j_elektro',
                    "shorten_name" => 'JTE',
                    "jurusan" => 'TE',
                ],
                [
                    "name" => 'Jurusan Teknik Kimia',
                    "username_email" => 'jtk_polinema',
                    "logo" => 'j_tk',
                    "shorten_name" => 'JTK',
                    "jurusan" => 'TK',
                ],
                [
                    "name" => 'Jurusan Administrasi Niaga',
                    "username_email" => 'jan_polinema',
                    "logo" => 'j_an',
                    "shorten_name" => 'JAN',
                    "jurusan" => 'AN',
                ],
                [
                    "name" => 'Jurusan Teknik Sipil',
                    "username_email" => 'jts_polinema',
                    "logo" => 'j_ts',
                    "shorten_name" => 'JTS',
                    "jurusan" => 'TS',
                ],
            ],
            "LT" =>  [
                [
                    "name" => 'Dewan Perwakilan Mahasiswa',
                    "username_email" => 'dpm_polinema',
                    "logo" => 'DPM',
                    "shorten_name" => 'DPM',
                ],
                [
                    "name" => 'Badan Eksekutif Mahasiswa',
                    "username_email" => 'bem_polinema',
                    "logo" => 'bem',
                    "shorten_name" => 'BEM',
                ],
            ],
            "HMJ" => [
                [
                    "name" => 'Himpunan Mahasiswa Teknologi Informasi',
                    "username_email" => 'hmti_polinema',
                    "logo" => 'hmti',
                    "shorten_name" => 'HMTI',
                    "jurusan" => 'TI',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Akuntansi',
                    "username_email" => 'hma_polinema',
                    "logo" => 'hma',
                    "shorten_name" => 'HMA',
                    "jurusan" => 'AK',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Teknik Mesin',
                    "username_email" => 'hmm_polinema',
                    "logo" => 'hmm',
                    "shorten_name" => 'HMM',
                    "jurusan" => 'TM',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Elektro',
                    "username_email" => 'hme_polinema',
                    "logo" => 'hme',
                    "shorten_name" => 'HME',
                    "jurusan" => 'TE',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Teknik Kimia',
                    "username_email" => 'hmtk_polinema',
                    "logo" => 'hmtk',
                    "shorten_name" => 'HMTK',
                    "jurusan" => 'TK',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Administrasi Niaga',
                    "username_email" => 'himania_polinema',
                    "logo" => 'himania',
                    "shorten_name" => 'HIMANIA',
                    "jurusan" => 'AN',
                ],
                [
                    "name" => 'Himpunan Mahasiswa Teknik Sipil',
                    "username_email" => 'hms_polinema',
                    "logo" => 'hms',
                    "shorten_name" => 'HMS',
                    "jurusan" => 'TS',
                ],
            ],
            "UKM" =>  [
                [
                    "name" => 'UKM Penalaran dan Pendidikan',
                    "username_email" => 'pp_polinema',
                    "logo" => 'pp',
                    "shorten_name" => 'UKM PP',
                ],
                [
                    "name" => 'UKM Bhakti Karya Mahasiswa',
                    "username_email" => 'bkm_polinema',
                    "logo" => 'BKM',
                    "shorten_name" => 'UKM BKM',
                ],
                [
                    "name" => 'UKM Resimen Mahasiswa',
                    "username_email" => 'menwa_polinema',
                    "logo" => 'menwa',
                    "shorten_name" => 'UKM Menwa',
                ],
            ],

        ]];


        foreach ($organizers as  $organizer) {
            foreach ($organizer as $type => $org) {
                foreach ($org as $content) {
                    if ($type === 'HMJ' || $type === 'Jurusan') {
                        $jurusan_id = Jurusan::where('kode_jurusan', $content["jurusan"])->value('id');
                        $user = User::create(
                            [
                                'name' => $content["name"],
                                'username' => $content["username_email"],
                                'email' => $content["username_email"] . '.simeva@polinema.ac.id',
                                'password' => Hash::make('password'),
                                'category_user' => 'Internal Kampus',
                                'jurusan_id' => $jurusan_id,
                            ]
                        );
                    } else {
                        $user = User::create(
                            [
                                'name' => $content["name"],
                                'username' => $content["username_email"],
                                'email' => $content["username_email"] . '.simeva@polinema.ac.id',
                                'password' => Hash::make('password'),
                                'category_user' => 'Internal Kampus',
                            ]
                        );
                    }
                    Organizer::create([
                        'shorten_name' => $content["shorten_name"],
                        'vision' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sunt, eligendi accusantium quidem.',
                        'mision' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus accusamus ducimus, architecto cum eveniet ea ipsa? Sint, eum dolores?|Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus accusamus ducimus|Lorem ipsum ducimus, architecto cum eveniet ea ipsa? Sint, eum dolores?|amet consectetur adipisicing elit. Consequatur doloribus accusamus ducimus, architecto cum eveniet ea ipsa? Sint, eum dolores?',
                        'description' => 'Repudiandae, eius impedit aliquid magni excepturi quam.',
                        'whatsapp_number' => '082344444444',
                        'user_id' => $user->id,
                        'organizer_type' => $type,
                        'logo' => $type === 'Kampus' ? 'assets/images/logo_polinema.png' : 'assets/images/logo_organizers/' . $content["logo"] . '.png',
                    ]);
                    $user->assignRole('Organizer');
                }
            }
        }

        $superAdmin->assignRole('Super Admin');
        $participantUser->assignRole('Participant');
    }
}
