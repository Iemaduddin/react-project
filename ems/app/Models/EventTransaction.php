<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class EventTransaction extends Model
{

    use HasUuids;
    protected $fillable = [
        'event_participant_id',
        'total_amount',
        'status',
        'payment_date',
        'proof_of_payment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function participant()
    {
        return $this->belongsTo(EventParticipant::class, 'event_participant_id');
    }
}
