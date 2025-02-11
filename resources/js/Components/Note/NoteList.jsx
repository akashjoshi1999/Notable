import { useEffect } from 'react';
import axios from 'axios';
import NoteCard from './NoteCard';

const NoteList = ({ notes, setNotes, onEdit }) => {
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [setNotes]);

  const handleEdit = (updatedNote) => {
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleDelete = (deletedNoteId) => {
    setNotes(notes.filter(note => note.id !== deletedNoteId));
  };

  return (
    <div className="note-list" style={styles.gridContainer}>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          id={note.id}
          image={note.image}
          description={note.description}
          content={note.content}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem',
    padding: '1rem',
  },
};

export default NoteList;