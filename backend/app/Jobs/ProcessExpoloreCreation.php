<?php

namespace App\Jobs;

use App\Events\ExploreCreateFailed;
use App\Models\Explore;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ProcessExpoloreCreation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userId;
    protected $caption;
    protected $attachmentPaths;


    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;

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

        $failedFiles = [];
        $message = '';


        if (!empty($this->attachmentPaths)) {
            $explore = Explore::create([
                'user_id' => $this->userId,
                'caption' => $this->caption,
            ]);

            foreach ($this->attachmentPaths as $path) {
                try {
                    $file = Storage::disk('local')->get($path);
                    $extension = pathinfo($path, PATHINFO_EXTENSION);
                    $name = uniqid() . '.' . $extension;
                    $directory = 'explore_attachments/' . $this->userId .
                        '/attachments/' . $explore->id;
                    $storedPath = $directory . '/' . $name;


                    if (!Storage::disk('local')->exists($directory)) {
                        Storage::disk('local')->makeDirectory($directory);
                    }

                    Storage::disk('local')->put($storedPath, $file);
                    $explore->attachments()->create([
                        'attachment' => $storedPath,
                    ]);

                    Log::info("stored: " . $storedPath);
                } catch (Throwable $e) {
                    Log::error('File upload failed: ' . $path . '-' . $e->getMessage());
                    $failedFiles[] = $path;
                }
            }

            if (!empty($failedFiles)) {
                if (count($this->attachmentPaths) === 1 && count($failedFiles) === 1) {
                    $explore->delete();
                    Log::info('Single file upload failed');
                    $message = 'File upload failed.';
                    broadcast(new ExploreCreateFailed($this->userId, $message, $failedFiles));
                    return;
                }

                if (count($failedFiles) === count($this->attachmentPaths)) {
                    $explore->delete();
                    Log::info('All file uploads failed, cancelling creation.');
                    $message = 'All file uploads failed, cancelling creation.';
                    broadcast(new ExploreCreateFailed($this->userId, $message ,$failedFiles));
                    return;
                } else {
                    $message = 'Some file uploads failed.';
                    broadcast(new ExploreCreateFailed($this->userId, $message ,$failedFiles));
                    Log::info('Some file uploads failed: ' . implode(', ', $failedFiles));
                    return;
                }
            }
        }

        $temp_dir = 'temp_attachments/explore/' . $this->userId;

        if (Storage::exists($temp_dir)) {
            Storage::deleteDirectory($temp_dir);
        }
    }
}
