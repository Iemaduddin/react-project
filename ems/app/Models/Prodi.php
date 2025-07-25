<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Prodi extends Model
{
    protected $table = 'prodi';
    use HasUuids;
    protected $fillable = ['nama_prodi', 'kode_prodi', 'jurusan_id'];

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }
    public function member()
    {
        return $this->belongsTo(TeamMember::class);
    }

    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'prodi_id');
    }
    public function stakeholders()
    {
        return $this->hasMany(Stakeholder::class);
    }
}
