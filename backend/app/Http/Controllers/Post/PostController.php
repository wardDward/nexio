<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $request->validate([
            'body' => 'string',
            'attachment.*' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ]);

        print_r($request->attachment);

        $post = auth()->user()->posts()->create([
            'body' => $request->body,
        ]);

        if ($request->hasFile('attachment')) {
            foreach ($request->file('attachment') as $attachment) {
                $name = uniqid() . '.' . $attachment->extension();
                Storage::disk('local')->put($name, 'attachments');
                $post->attachments()->create([
                    'attachment' => $name,
                    'caption' => 'test'
                ]);
            }
        }
        return response()->noContent();
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
