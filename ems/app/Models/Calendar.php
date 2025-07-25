<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'event_id',
        'organizer_id',
        'title',
        'start_date',
        'end_date',
        'is_public',
        'all_day',
    ];

    protected $casts = [
        'is_public' => 'boolean',
        'all_day' => 'boolean',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    public function organizer()
    {
        return $this->belongsTo(Organizer::class, 'organizer_id');
    }
}
