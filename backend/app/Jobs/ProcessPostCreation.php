<?php

namespace App\Jobs;

use App\Events\PostCreationFailed;
use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Throwable;
use Exception;


class ProcessPostCreation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $userId;
    public $body;
    public $attachmentPaths;



    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;


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
        $failedFiles = [];


        $post = Post::create([
            'user_id' => $this->userId,
            'body' => $this->body,
        ]);

        if (!empty($this->attachmentPaths)) {

            try {
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

                    Log::info("stored: " . $storedPath);
                }

            } catch (Throwable $e) {
                Log::error('File upload failed: ' . $path . '-' . $e->getMessage());
                $failedFiles[] = $path;
            }

            if (!empty($failedFiles)) {
                if (count($failedFiles) === 1 && count($failedFiles) === 1) {
                    $post->delete();
                    Log::info("Single file upload failed.");
                    $message = 'File upload failed.';
                    broadcast(new PostCreationFailed($this->userId, $message, $failedFiles));
                    return;
                }

                if (count($failedFiles) === count($this->attachmentPaths)) {
                    $post->delete();
                    $message = 'All file uploads failed, cancelling creation.';
                    broadcast(new PostCreationFailed($this->userId, $message, $failedFiles));
                    Log::info("All Files are failed to upload.");
                    return;
                } else {
                    $message = 'Some file uploads failed.';
                    broadcast(new PostCreationFailed($this->userId, $message, $failedFiles));
                    Log::info("Some files is failed to be uploaded: " . implode(', ', $failedFiles));
                    return;
                }
            }

            $temp_dir = 'temp_attachments/' . $this->userId;

            // Ensure the directory itself is deleted
            if (Storage::exists($temp_dir)) {
                Storage::deleteDirectory($temp_dir);
            }
        }

    }
}
