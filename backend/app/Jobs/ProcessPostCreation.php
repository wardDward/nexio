<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ProcessPostCreation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $userId;
    protected $body;
    protected $attachmentPaths;


    /**
     * Create a new job instance.
     */
    public function __construct($userId, $body, $attachmentPaths)
    {
        $this->userId = $userId;
        $this->body = $body;
        $this->attachmentPaths = $attachmentPaths;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $post = Post::create([
            'user_id' => $this->userId,
            'body' => $this->body,
        ]);

        if (!empty($this->attachmentPaths)) {
            foreach ($this->attachmentPaths as $path) {
                $file = Storage::disk('local')->get($path);
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $name = uniqid() . '.' . $extension;
                $directory = 'users_attachments/' . $this->userId . '/attachments' . '/' . $post->id;
                $storedPath = $directory . '/' . $name;

                if (!Storage::disk('local')->exists($directory)) {
                    Storage::disk('local')->makeDirectory($directory);
                }

                Storage::disk('local')->put($storedPath, $file);

                $post->attachments()->create([
                    'attachment' => $storedPath,
                ]);
            }

            $temp_dir = 'temp_attachments/' . $this->userId;

            // Ensure the directory itself is deleted
            if (Storage::exists($temp_dir)) {
                Storage::deleteDirectory($temp_dir);
            }
        }

    }
}
