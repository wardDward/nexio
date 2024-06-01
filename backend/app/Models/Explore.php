<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Explore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'caption',
        'privacy'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(ExploreAttachment::class, 'explore_id');
    }
}
