import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NoteList from '@/Components/Note/NoteList';
import CreateNoteForm from '@/Components/Note/CreateNoteForm';
import { useState } from 'react';

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const handleCreate = (newNote) => {
        if (editingNote) {
            setNotes(notes.map(note => (note.id === newNote.id ? newNote : note)));
            setEditingNote(null);
        } else {
            setNotes([newNote, ...notes]);
        }
        setIsCreating(false); // Hide the form after creating or editing a note
    };

    const handleAddNote = () => {
        setEditingNote(null);
        setIsCreating(true);
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setIsCreating(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {isCreating ? (
                                <CreateNoteForm onCreate={handleCreate} note={editingNote} />
                            ) : (
                                <button onClick={handleAddNote}>Add Note</button>
                            )}
                            <NoteList notes={notes} setNotes={setNotes} onEdit={handleEditNote} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
