import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import apiClient from 'infrastructure/apiClient';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (formikValues) => {
    try {
      const payload = {
        title: formikValues.title,
        chat_role: formikValues.content,
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
      <Formik
        initialValues={{ title: '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="title"
              label="Title"
              fullWidth
              component={TextField}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              style={{ marginBottom: '1rem' }}
            />
            <Field
              name="content"
              label="Content"
              fullWidth
              multiline
              rows={4}
              component={TextField}
              helperText={touched.content && errors.content}
              error={touched.content && !!errors.content}
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreatePost;