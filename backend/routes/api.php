<?php

use App\Http\Controllers\Explore\ExploreController;
use App\Http\Controllers\Post\PostAttachmentController;
use App\Http\Controllers\Post\PostController;
use App\Models\ExploreAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


Route::middleware(['auth:sanctum'])->group(function () {

//post releted
    Route::apiResource('/posts', PostController::class);

    Route::get('/media_attachments/{id}/{path}', [PostAttachmentController::class, 'view_attachments'])->where('path', '.*');

//explore related
    Route::apiResource('/explores', ExploreController::class);
    Route::get('/explore_attachmetns/{id}/{path}', [ExploreAttachment::class, 'view_explore'])->where('path', '.*');


// global
    Route::get('/storage/{path}', function ($path) {
        if (!$path) {
            abort(404);
        }
        return Storage::disk('local')->get($path);
    })->where('path', '.*');
});
