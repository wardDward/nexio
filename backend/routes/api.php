<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\ExploreAttachmentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Post\PostAttachmentController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\PostLikeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;



Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //post releted
    Route::apiResource('/posts', PostController::class);
    Route::get('/media_attachments/{id}/{path}', [PostAttachmentController::class, 'view_attachments'])->where('path', '.*');

    //explore related
    Route::apiResource('/explores', ExploreController::class);
    Route::get('/explore_attachments/{id}/{path}', [ExploreAttachmentController::class, 'view_explore'])->where('path', '.*');

    //like post
    Route::post('/posts/{post}/like', [PostLikeController::class, 'toggleLike']);

    // notification
    Route::get('/notification', [NotificationController::class, 'getNotifications']);
    Route::get('/unread_notification', [NotificationController::class, 'getUnreadNotification']);
    Route::get('/read_notification', [NotificationController::class, 'readNotifications']);

    // comment 
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/comments/{post_id}', [CommentController::class, 'show']);

    //friends
    Route::get('/suggestions', [FriendController::class, 'index']);
    Route::post('/add_friend', [FriendController::class, 'sentFriendRequest']);
    Route::post('/accept_friend', [FriendController::class, 'acceptFriendRequest']);

    // global
    Route::get('/storage/{path}', function ($path) {
        if (!$path) {
            abort(404);
        }
        return Storage::disk('local')->get($path);
    })->where('path', '.*');
});
