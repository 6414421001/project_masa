<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Music;

class MusicController extends Controller
{
    public function index()
    {
        $music = Music::all();
        return response()->json([
            'success' => true,
            'data' => $music
        ]);
    }

    /**
     * Store a newly created music entry in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'track_number' => 'required|integer',
            'duration' => 'required|string',
            'language' => 'required|string|max:255',
            'file_path' => 'required|string|max:255',
            'plays' => 'required|integer',
        ]);

        $music = Music::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Music created successfully.',
            'data' => $music
        ]);
    }

    /**
     * Display the specified music entry.
     */
    public function show(Music $music)
    {
        return response()->json([
            'success' => true,
            'data' => $music
        ]);
    }

    /**
     * Update the specified music entry in storage.
     */
    public function update(Request $request, Music $music)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'album' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'track_number' => 'required|integer',
            'duration' => 'required|string',
            'language' => 'required|string|max:255',
            'file_path' => 'required|string|max:255',
            'plays' => 'required|integer',
        ]);

        $music->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Music updated successfully.',
            'data' => $music
        ]);
    }

    /**
     * Remove the specified music entry from storage.
     */
    public function destroy(Music $music)
    {
        $music->delete();

        return response()->json([
            'success' => true,
            'message' => 'Music deleted successfully.'
        ]);
    }
}
