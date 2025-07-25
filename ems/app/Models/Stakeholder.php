<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stakeholder extends Model
{
    protected $fillable = [
        'name',
        'identifier',
        'type',
        'position',
        'is_active',
        'jurusan_id',
        'prodi_id',
        'organizer_id',
    ];

    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class);
    }

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }
}
