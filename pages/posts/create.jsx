import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import apiClient from 'infrastructure/apiClient';
import { useRouter } from 'next/router';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          title: values.title,
          chat_role: values.content,
        };

        // Make a POST request to the API endpoint
        const response = await apiClient.post('posts/', payload)
        router.push(`/posts/${response?.data.id}`);

      } catch (error) {
        // Handle error, e.g. show an error message
        console.error('Error creating post:', error);
      }
    },
  });

  return (
    <Container maxWidth="sm" style={{ marginTop: '1rem' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        Create a New Post
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title && formik.errors.title}
          error={formik.touched.title && !!formik.errors.title}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.content && formik.errors.content}
          error={formik.touched.content && !!formik.errors.content}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          Create Post
        </Button>
      </form>
    </Container>
  );
};

export default CreatePost;