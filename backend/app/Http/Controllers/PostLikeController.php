<?php

namespace App\Http\Controllers;

use App\Models\PostUserLike;
use App\Notifications\PostLikeNotification;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostLikeController extends Controller
{
    public function toggleLike(Request $request, Post $post)
    {
        $auth = auth()->user()->id;

        $findPost = $post->whereId($post->id)->with(['user'])->first();
        $post_owner = $findPost->user_id;

        $liked = PostUserLike::withTrashed()
            ->where('user_id', $auth)
            ->where('post_id', $findPost->id)->first();

        if ($liked) {
            if ($liked->trashed()) {
                $liked->restore();
                $status = true;
            } else {
                $liked->delete();
                $status = false;
            }
        } else {
            DB::table('post_user_likes')->insert([
                'user_id' => $auth,
                'post_id' => $findPost->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $status = true;
            $post->user->notify(new PostLikeNotification($post, auth()->user()));
        }

        return response()->json([
            'status' => $status,
            'to' => $post_owner,
            'post' => $findPost->id
        ], 201);
    }
}
