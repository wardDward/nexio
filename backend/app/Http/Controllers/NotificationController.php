<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getUnreadNotification()
    {
        return array_merge([
            'unreadNotification' => auth()->user()->unreadNotifications()->count(),
        ]);
    }

    public function readNotifications()
    {
        return auth()->user()->unreadNotifications->markAsRead();
    }
    public function getNotifications()
    {

        $notifications = auth()->user()->notifications()->latest()->paginate(10);

        return response()->json([
            'notifications' => $notifications,
        ]);
    }
}
