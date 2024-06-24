<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

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
        'is_admin'
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
        ];
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    public function explores()
    {
        return $this->hasMany(Explore::class, 'user_id');
    }

    // get all the follower_id that related in the user_id
    public function following()
    {
        return $this->belongsToMany(User::class, 'follower_user', 'user_id', 'follower_id');
    }

    // get all the user_id that related in the follower_id
    public function followers()
    {
        return $this->belongsToMany(User::class, 'follower_user', 'follower_id', 'user_id');
    }

    // liked post by authenticated user
    public function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'post_user_likes', 'user_id', 'post_id')
            ->using(PostUserLike::class)
            ->withTimestamps()
            ->withPivot('deleted_at')
            ->whereNull('post_user_likes.deleted_at');
    }

    // liked post by the users
    public function likes()
    {
        return $this->belongsToMany(User::class, 'post_user_likes', 'post_id', 'user_id')
            ->using(PostUserLike::class)
            ->withTimestamps()
            ->withPivot('deleted_at')
            ->whereNull('post_user_likes.deleted_at');
        ;
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

}
