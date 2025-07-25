<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Prodi;
use App\Models\Mahasiswa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama (optional: hapus juga user jika perlu)
        // DB::table('mahasiswa')->truncate();
        // DB::table('users')->where('email', 'like', 'mahasiswa%@mail.com')->delete(); // supaya nggak hapus semua user
        $prodis = Prodi::all();

        foreach ($prodis as $prodi) {
            for ($i = 1; $i <= 5; $i++) {
                // Buat user dummy
                $user = User::create([
                    'name' => 'Mahasiswa ' . $i . ' - ' . $prodi->nama_prodi,
                    'username' => 'mahasiswa_' . $i . '_' . $prodi->kode_prodi,
                    'email' => 'mahasiswa' . $i . '_' . Str::slug($prodi->nama_prodi) . '@mail.com',
                    'password' => Hash::make('password'),
                    'jurusan_id' => $prodi->jurusan_id,
                    'category_user' => 'Internal Kampus',
                ]);
                $user->assignRole('Participant');
                Mahasiswa::create([
                    'user_id' => $user->id,
                    'prodi_id' => $prodi->id,
                    'nim' => 'NIM' . rand(100000, 999999),
                    'tanggal_lahir' => now()->subYears(rand(18, 24))->subDays(rand(0, 365)),
                    'jenis_kelamin' => ['Laki-laki', 'Perempuan'][rand(0, 1)],
                ]);
            }
        }
    }
}