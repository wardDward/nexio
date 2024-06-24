<?php

use Illuminate\Support\Facades\Broadcast;


// Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('explores.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('posts.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('comments.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


