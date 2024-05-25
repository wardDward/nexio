<?php

namespace App\Http\Resources;

use App\Models\PostAttachment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostAttachmentResource extends JsonResource
{

    /**
     * The resource that this resource collects.
     *
     * @var string
     */
    public $collects = PostAttachment::class;
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'post_id' => $this->post_id,
            'attachment' => $this->attachment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
