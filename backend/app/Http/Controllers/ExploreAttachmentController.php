<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Explore;
use App\Models\ExploreAttachment;
use Illuminate\Http\Request;

class ExploreAttachmentController extends Controller
{
    public function view_explore($id, $path)
    {

        $explore = Explore::with(['users'])->where('id', $id);
        $explore_attachment = ExploreAttachment::where('explore_id', $id)->where('attachment', $path)->firstOrFail();

        return response()->json([
            "explore" => $explore,
            "explore_attachment" => $explore_attachment
        ], 200);
    }
}
