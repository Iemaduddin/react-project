<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    use HasUuids;
    protected $table = 'jurusan';

    protected $fillable = ['nama', 'kode_jurusan'];

    public function prodi()
    {
        return $this->hasMany(Prodi::class, 'jurusan_id');
    }
    public function user()
    {
        return $this->hasMany(User::class, 'jurusan_id');
    }
    public function asset()
    {
        return $this->hasMany(Asset::class, 'jurusan_id');
    }

    public function stakeholders()
    {
        return $this->hasMany(Stakeholder::class);
    }
}
