<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExploreResource;
use App\Models\Explore;
use App\Models\ExploreAttachment;
use App\Models\User;
use Illuminate\Http\Request;

class ExploreAttachmentController extends Controller
{
    public function view_explore($id, $path)
    {
        $explore = Explore::with(['users'])->find($id);

        return new ExploreResource($explore);   
      
    }
}
