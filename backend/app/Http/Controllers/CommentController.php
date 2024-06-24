<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Notifications\CommentNotification;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function store(Request $request)
    {

        $data = $request->validate([
            'post_id' => ['required'],
            'comment' => ['required'],
        ]);

        $commented = auth()->user()->comments()->create($data);
        // $post_ownder = Post::where('id', $commented->post_id)->first();
        // $sendOwner = User::where('id', $commented->user_id)->first();
        broadcast(new CommentEvent($commented, $request->user()));
        $commented->posts->user->notify(new CommentNotification($commented, auth()->user()));
        return response()->json([
            'commented' => $commented,
        ], 201);
    }

    public function show($id)
    {
        $comments = Comment::where("post_id", $id)->with(['users'])->paginate(10);

        return CommentResource::collection($comments);
    }
}
