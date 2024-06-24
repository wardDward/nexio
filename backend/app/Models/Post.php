<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'body',
        'privacy'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function attachments()
    {
        return $this->hasMany(PostAttachment::class, 'post_id');
    }

    public function likedBy()
    {
        return $this->belongsToMany(User::class, 'post_user_likes', 'post_id', 'user_id')
            ->using(PostUserLike::class)
            ->withTimestamps()
            ->withPivot('deleted_at')
            ->whereNull('post_user_likes.deleted_at');
    }


    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

}
