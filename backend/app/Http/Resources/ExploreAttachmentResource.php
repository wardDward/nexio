<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExploreAttachmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'explore_id' => $this->explore_id,
            'attachment' => $this->attachment,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}