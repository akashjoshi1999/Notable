import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const CreateNoteForm = ({ onCreate, note }) => {
  const [noteData, setNoteData] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    if (note) {
      setNoteData(note);
    } else {
      setNoteData({ title: '', content: '', image: '' });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (note) {
        response = await axios.put(`/notes/${note.id}`, noteData);
      } else {
        response = await axios.post('/notes', noteData);
      }
      if (onCreate) onCreate(response.data);
      setNoteData({ title: '', content: '', image: '' }); // Reset the form after successful creation
    } catch (error) {
      console.error('Error creating or updating note:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        {note ? 'Edit Note' : 'Create New Note'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={noteData.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Content"
          name="content"
          value={noteData.content}
          onChange={handleChange}
          required
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="image"
          value={noteData.image}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          {note ? 'Update Note' : 'Create Note'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateNoteForm;