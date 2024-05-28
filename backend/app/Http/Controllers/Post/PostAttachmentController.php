<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostAttachment;
use Illuminate\Http\Request;

class PostAttachmentController extends Controller
{
    public function view_attachments($id, $path)
    {

        $post_attachments = PostAttachment::where('post_id', $id)
            ->where('attachment', $path)->firstOrFail();
        $allAttachments = PostAttachment::where('post_id', $id)->get();

        return response()->json([
            'allAttachments' => $allAttachments,
            'post_attachment' => $post_attachments
        ], 200);
    }
}
