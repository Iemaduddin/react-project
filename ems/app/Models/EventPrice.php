<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventPrice extends Model
{
    protected $fillable = [
        'event_id',
        'category_name',
        'scope',
        'price'
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
