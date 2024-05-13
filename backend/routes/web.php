<?php

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/post', function(Request $request) {
    $request->validate([
        'body' => 'string',
        'attachment.*' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048'
    ]);

    print_r($request->attachment);

    $post = Post::create([
        'user_id' => 20,
        'body' => 'tset'
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
})->name('test');



require __DIR__.'/auth.php';