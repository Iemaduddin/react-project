<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EventParticipant extends Model
{
    use HasUuids;
    protected $fillable = [
        'event_id',
        'user_id',
        'ticket_code',
        'status',
        'reason',
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    public function transaction()
    {
        return $this->hasOne(EventTransaction::class, 'event_participant_id');
    }
    public function attendances()
    {
        return $this->hasMany(EventAttendance::class, 'event_participant_id', 'id');
    }
    public function files()
    {
        return $this->hasMany(EventFile::class, 'participant_id');
    }

    public function formResponses()
    {
        return $this->hasMany(FormResponse::class, 'participant_id');
    }
}
