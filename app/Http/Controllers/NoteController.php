<?php
namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $notes = Note::all();
        return response()->json($notes);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $note = Note::create($request->all());
        return response()->json($note, 201);
    }

    // Display the specified resource.
    public function show(Note $note)
    {
        return response()->json($note);
    }

    // Update the specified resource in storage.
    public function update(Request $request, Note $note)
    {
        $note->update($request->all());
        return response()->json($note);
    }

    // Remove the specified resource from storage.
    public function destroy(Note $note)
    {
        $note->delete();
        return response()->json(null, 204);
    }
}