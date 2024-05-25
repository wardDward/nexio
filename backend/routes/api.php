<?php

use App\Http\Controllers\Post\PostController;
use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('/posts', PostController::class);
});

Route::get('/storage/{path}', function ($path) {

    if (!$path) {
        abort(404);
    }
    return Storage::disk('local')->get($path);
})->where('path', '.*');
