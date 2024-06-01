<?php

namespace App\Jobs;

use App\Models\Explore;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessExpoloreCreation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userId;
    protected $caption;
    protected $attachmentPaths;


    /**
     * Create a new job instance.
     */
    public function __construct($userId, $caption, $attachmentPaths)
    {
        $this->userId = $userId;
        $this->caption = $caption;
        $this->attachmentPaths = $attachmentPaths;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $explore = Explore::create([
            'user_id' => $this->userId,
            'caption' => $this->caption,
        ]);

        if (!empty($this->attachmentPaths)) {
            foreach ($this->attachmentPaths as $path) {
                $file = Storage::disk('local')->get($path);
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $name = uniqid() . '.' . $extension;
                $directory = 'explore_attachments/' . $this->userId .
                    '/attachments/' . $explore->id;
                $storedPath = $directory . '/' . $name;

                Log::info("stored: " . $storedPath);

                if (!Storage::disk('local')->exists($directory)) {
                    Storage::disk('local')->makeDirectory($directory);
                }

                Storage::disk('local')->put($storedPath, $file);

                $explore->attachments()->create([
                    'attachment' => $storedPath,
                ]);
            }
        }

        $temp_dir = 'temp_attachments/explore/' . $this->userId;

        if (Storage::exists($temp_dir)) {
            Storage::deleteDirectory($temp_dir);
        }
    }
}
