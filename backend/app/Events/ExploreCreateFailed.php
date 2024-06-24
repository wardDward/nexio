<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExploreCreateFailed implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    /**
     * Create a new event instance.
     */
    public function __construct(public $userId, public $message, public $failedFiles)
    {
        $this->userId = $userId;
        $this->message = $message;
        $this->failedFiles = $failedFiles;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return <int, \Illuminate\Broadcasting\PrivateChannel>
     */
    public function broadcastOn()
    {
        return new PrivateChannel('explores.' . $this->userId);
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->userId,
            'message' => $this->message,
            'failed_path' => $this->failedFiles
        ];
    }
}
