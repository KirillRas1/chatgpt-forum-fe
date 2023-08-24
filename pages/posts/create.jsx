import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import apiClient from 'infrastructure/apiClient';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: title,
        chat_role: content,
      };

      // Make a POST request to the API endpoint
      const response = await apiClient.post('posts/', payload);
      
      // Handle the response, e.g. show a success message
      console.log('Post created:', response.data);

    } catch (error) {
      // Handle error, e.g. show an error message
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1rem' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        Create a New Post
      </Typography>
      <TextField
        label="Title"
        fullWidth
        style={{ marginBottom: '1rem' }}
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        label="Initial Prompt"
        fullWidth
        multiline
        rows={4}
        style={{ marginBottom: '1rem' }}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: '1rem' }}
      >
        Create Post
      </Button>
    </Container>
  );
};

export default CreatePost;
