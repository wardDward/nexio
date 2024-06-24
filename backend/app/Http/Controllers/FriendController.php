<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\FriendNotification;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FriendController extends Controller
{
    public function index()
    {
        $users = User::whereDoesntHave('following', function (Builder $query) {
            $query->where('follower_id', auth()->user()->id);
        })
        ->leftJoin('follower_user', function ($join) {
            $join->on('users.id', '=', 'follower_user.follower_id')
                ->where('follower_user.user_id', auth()->user()->id);
        })
        ->where(function($query) {
            $query->whereNull('follower_user.status')
                  ->orWhere('follower_user.status', '!=', 'friends');
        })
        ->select('users.*', 'follower_user.status')
        ->get();
    
        return response()->json($users);
    }


    public function sentFriendRequest(Request $request, User $user)
    {
        $data = $request->validate([
            'follower_id' => 'exists:users,id'
        ]);

        DB::table('follower_user')->insert([
            'user_id' => auth()->user()->id,
            'follower_id' => $data['follower_id'],
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        $follower = User::find($data['follower_id']);

        if ($follower) {
            $follower->notify(new FriendNotification($follower, auth()->user()));
        }

        return response()->json(['message' => 'Friend request sent successfully.'], 200);
    }

    public function unsentFriendRequest(Request $request, User $user)
    {
    }

    public function acceptFriendRequest(Request $request)
    {
        DB::table('follower_user')->where('follower_id', $request->follower_id)->where('user_id', $request->auth_id)->update([
            'status' => 'friends'
        ]);

        DB::table('notifications')->where('id', $request->id)->delete();

        return response()->json(['message' => 'friend request accepted'], 200);
    }


}
