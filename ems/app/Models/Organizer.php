<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Organizer extends Model
{
    use HasUuids;
    protected $fillable = [
        'shorten_name',
        'vision',
        'mision',
        'description',
        'link_media_social',
        'whatsapp_number',
        'user_id',
        'organizer_type',
        'logo'
    ];

    protected $casts = [
        'organizer_type' => 'string',
        'link_media_social' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function teamMembers()
    {
        return $this->hasMany(TeamMember::class);
    }

    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function calendars()
    {
        return $this->hasMany(Calendar::class, 'organizer_id');
    }
    public function stakeholders()
    {
        return $this->hasMany(Stakeholder::class);
    }
}
