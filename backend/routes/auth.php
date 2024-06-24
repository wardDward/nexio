<?php

use App\Http\Controllers\Auth\AuthenticateController;
use App\Http\Controllers\Auth\EmailVefiticationNotificationController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {

    Route::post('register', [RegisterController::class, 'store']);

    Route::post('login', [AuthenticateController::class, 'store'])->name('login');
});


Route::get('/email/verify/{id}/{hash}', VerifyEmailController::class)->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', [EmailVefiticationNotificationController::class, 'store'])->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');
