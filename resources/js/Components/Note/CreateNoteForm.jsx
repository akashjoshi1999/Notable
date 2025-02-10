import { useState } from 'react';
import axios from 'axios';

const CreateNoteForm = ({ onCreate }) => {
  const [note, setNote] = useState({ title: '', content: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/notes', note);
      if (onCreate) onCreate(response.data);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Content"
      />
      <input
        type="text"
        name="image"
        value={note.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNoteForm;