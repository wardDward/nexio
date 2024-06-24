<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostUserLike extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'post_user_likes';
}
