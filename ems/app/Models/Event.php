<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Event extends Model
{
    use HasUuids;
    protected $fillable = [
        'organizer_id',
        'title',
        'theme',
        'description',
        'scope',
        'date_event_start',
        'date_event_end',
        'registration_date_start',
        'registration_date_end',
        'registration_extended',
        'location',
        'remaining_quota',
        'quota',
        'event_mode',
        'event_category',
        'benefit',
        'pamphlet_path',
        'banner_path',
        'sponsored_by',
        'media_partner',
        'additional_links',
        'event_leader',
        'contact_person',
        'is_free',
        'is_publish',
        'status'
    ];

    protected $casts = [
        'date_event_start' => 'datetime',
        'date_event_end' => 'datetime',
        'registration_date_start' => 'datetime',
        'registration_date_end' => 'datetime',
        'registration_extended' => 'boolean',
        'is_draft' => 'boolean',
        'is_publish' => 'boolean',
        'scope' => 'string',
        'event_mode' => 'string',
        'status' => 'string'
    ];


    public function steps()
    {
        return $this->hasMany(EventStep::class);
    }

    public function participants()
    {
        return $this->hasMany(EventParticipant::class);
    }

    public function prices()
    {
        return $this->hasMany(EventPrice::class);
    }
    public function bookings()
    {
        return $this->hasMany(AssetBooking::class);
    }

    public function forms()
    {
        return $this->hasMany(EventForm::class);
    }
    public function organizers()
    {
        return $this->belongsTo(Organizer::class, 'organizer_id');
    }
    public function calendars()
    {
        return $this->belongsTo(Calendar::class, 'event_id');
    }
    public function documents()
    {
        return $this->hasMany(AssetBookingDocument::class, 'event_id');
    }
    public function userItems()
    {
        return $this->hasMany(UserItem::class, 'event_id');
    }
}