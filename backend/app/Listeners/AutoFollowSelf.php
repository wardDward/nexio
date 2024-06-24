<?php

namespace App\Listeners;

use App\Events\FollowSelf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AutoFollowSelf
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FollowSelf $event): void
    {
        $user_info = $event->user;
        Log::info('Handling FollowSelf event for user ID: ' . $event->user->id);

        $existing = DB::table('follower_user')
            ->where('user_id', $user_info->id)
            ->where('follower_id', $user_info->id)
            ->exists();

        if (!$existing) {
            DB::table('follower_user')->insert([
                'user_id' => $user_info->id,
                'follower_id' => $user_info->id,
                'status' => 'self',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
