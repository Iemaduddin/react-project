<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['nim', 'name', 'prodi_id', 'organizer_id', 'level', 'position', 'is_leader'];

    public function organizer()
    {
        return $this->belongsTo(Organizer::class);
    }
    public function prodi()
    {
        return $this->belongsTo(Prodi::class);
    }

    public function attendances()
    {
        return $this->hasMany(EventAttendance::class, 'team_member_id', 'id');
    }
}
