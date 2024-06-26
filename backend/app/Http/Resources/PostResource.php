<?php

namespace App\Http\Resources;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class PostResource extends JsonResource
{

    /**
     * The resource that this resource collects.
     *
     * @var string
     */
    public $collects = Post::class;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = Auth::user();

        return [
            'id' => $this->id,
            'body' => $this->body,
            'post_attachments' => PostAttachmentResource::collection($this->attachments),
            'post_owner' => new PostOwnerResource($this->user),
            'liked' => $this->likedBy()->where('user_id', $user->id)->exists(),
            'likes_count' => $this->liked_by_count,
            'comments_count' => $this->comments_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
