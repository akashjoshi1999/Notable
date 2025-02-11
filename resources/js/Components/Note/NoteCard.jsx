import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useState } from 'react';

const NoteCard = ({ id, image, description, content, onEdit, onDelete }) => {
  const [note, setNote] = useState({ id, image, description, content });

  const handleEdit = () => {
    onEdit(note);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/notes/${note.id}`);
      if (onDelete) onDelete(note.id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '1rem', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={note.image}
        alt={note.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {note.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit} startIcon={<EditIcon />}>
          Edit
        </Button>
        <Button size="small" onClick={handleDelete} startIcon={<DeleteIcon />} color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
