<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventAttendance extends Model
{
    protected $table = 'event_attendance';

    protected $fillable = [
        'event_participant_id',
        'team_member_id',
        'event_step_id',
        'attendance_arrival',
        'attendance_departure',
        'attendance_arrival_time',
        'attendance_departure_time',
    ];

    protected $casts = [
        'attendance_arrival' => 'boolean',
        'attendance_departure' => 'boolean',
        'attendance_arrival_time' => 'datetime',
        'attendance_departure_time' => 'datetime',
    ];

    /**
     * Get the event participant that owns this attendance.
     */
    public function eventParticipant()
    {
        return $this->belongsTo(EventParticipant::class, 'event_participant_id', 'id');
    }

    /**
     * Get the team member that owns this attendance.
     */
    public function teamMember()
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id', 'id');
    }

    /**
     * Get the event step that owns this attendance.
     */
    public function eventStep()
    {
        return $this->belongsTo(EventStep::class, 'event_step_id', 'id');
    }
}
