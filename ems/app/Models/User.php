<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasUuids, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'category_user',
        'jurusan_id',
        'phone_number',
        'province',
        'city',
        'subdistrict',
        'village',
        'address',
        'profile_picture',
        'is_active',
        'is_blocked',
        'blocked_reason',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'category_user' => 'string'
        ];
    }

    public function getIncrementing()
    {
        return false;
    }
    public function getKeyType()
    {
        return 'string';
    }
    public function mahasiswa()
    {
        return $this->hasOne(Mahasiswa::class);
    }
    public function jurusan()
    {
        return $this->belongsTo(Jurusan::class, 'jurusan_id');
    }
    public function organizer()
    {
        return $this->hasOne(Organizer::class);
    }

    public function eventParticipations()
    {
        return $this->hasMany(EventParticipant::class);
    }

    public function transactions()
    {
        return $this->hasMany(EventTransaction::class);
    }

    public function userItems()
    {
        return $this->hasMany(UserItem::class, 'user_id');
    }
}
