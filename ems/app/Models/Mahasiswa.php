<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Mahasiswa extends Model
{
    protected $table = 'mahasiswa';
    use HasUuids;
    protected $fillable = [
        'user_id',
        'prodi_id',
        'nim',
        'tanggal_lahir',
        'jenis_kelamin'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'jenis_kelamin' => 'string'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'prodi_id');
    }
}
