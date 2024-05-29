<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Jobs\ProcessPostCreation;
use App\Models\Post;
use Illuminate\Http\Request;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $following_id = auth()->user()->following()->pluck('follower_id');

        $posts = Post::whereIn('user_id', $following_id)
            ->where('user_id', '!=', auth()->user()->id)
            ->with(['user'])->orderBy('created_at', 'desc')->paginate(5);

        return PostResource::collection($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            // 'body' => 'string',
            'attachment.*' => 'required|file|mimes:jpg,jpeg,png,mkv,mp4'
        ]);

        $userId = auth()->user()->id;
        $body = $request->body;
        $attachments = $request->file('attachment');
        $attachmentPaths = [];

        if (!empty($attachments)) {
            foreach ($attachments as $attachment) {
                $name = uniqid() . '.' . $attachment->extension();
                $directory = 'temp_attachments/' . $userId;
                $path = $attachment->storeAs($directory, $name, 'local');
                $attachmentPaths[] = $path;
            }
        }

        ProcessPostCreation::dispatch($userId, $body, $attachmentPaths);

        return response()->json(['message' => 'Post creation in progress'], 202);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


}
