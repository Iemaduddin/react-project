<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EventStep extends Model
{
    use HasUuids;
    protected $fillable = [
        'event_id',
        'asset_id',
        'step_name',
        'event_date',
        'event_time_start',
        'event_time_end',
        'description',
        'execution_system',
        'location_type',
        'location',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'is_free' => 'boolean',
        'status' => 'string'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }


    public function event_speaker()
    {
        return $this->hasMany(EventSpeaker::class, 'event_step_id');
    }

    public function attendances()
    {
        return $this->hasMany(EventAttendance::class, 'event_step_id', 'id');
    }
}
