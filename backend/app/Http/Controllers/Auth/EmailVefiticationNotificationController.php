<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVefiticationNotificationController extends Controller
{
    public function store(Request $request)
{
    if ($request->user()->hasVerifiedEmail()) {
            return redirect(config('app.frontend_url') . '/');
    }

    $request->user()->sendEmailVerificationNotification();

    // return back()->with('auth:sanctum', 'verification-link-sent');
}
}
