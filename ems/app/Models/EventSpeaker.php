<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventSpeaker extends Model
{
    protected $fillable = [
        'event_step_id',
        'name',
        'role',
    ];

    public function event_step()
    {
        return $this->belongsTo(EventStep::class, 'event_step_id');
    }
}