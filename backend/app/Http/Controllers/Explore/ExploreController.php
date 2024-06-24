<?php

namespace App\Http\Controllers\Explore;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExploreCollection;
use App\Http\Resources\ExploreResource;
use App\Jobs\ProcessExpoloreCreation;
use App\Models\Explore;
use Illuminate\Http\Request;

class ExploreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $explores = Explore::with(['users'])
            ->orderBy('created_at', 'desc')->paginate(12);

        return ExploreResource::collection($explores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'attachment.*' => 'required|file|mimes:jpg,jpeg,png,mkv,mp4,mov'
        ]);

        $userId = auth()->user()->id;
        $caption = $request->caption;
        $attachments = $request->file('attachment');
        $attachmentPaths = [];

        if (!empty($attachments)) {
            foreach ($attachments as $attachment) {
                $name = uniqid() . '.' . $attachment->extension();
                $temp_dir = 'temp_attachments/explore/' . $userId;
                $path = $attachment->storeAs($temp_dir, $name, 'local');
                $attachmentPaths[] = $path;
            }
        }

        ProcessExpoloreCreation::dispatch($userId, $caption, $attachmentPaths);

        return response()->json([
            'message' => 'Explore is in process.'
        ], 202);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
