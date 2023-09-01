import React, { useContext, useState } from 'react';
import { Container, Typography, TextField, Button, Chip } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { authContext } from 'contexts/Auth';
import TagList from 'components/tags/TagList';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required')
});

const CreatePost = () => {
  const router = useRouter();
  const { apiClient } = useContext(authContext);
  const [tags, setTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: ''
    },
    title: '',
    content: '',
    validationSchema,
    handleSubmit: () => {
      console.log('called handleSubmit');
    },
    onSubmit: async values => {
      console.log(values);
      try {
        const payload = {
          title: values.title,
          chat_role: values.content,
          tags
        };

        // Make a POST request to the API endpoint
        const response = await apiClient.post('posts/', payload);
        router.push(`/posts/${response?.data.id}`);
      } catch (error) {
        // Handle error, e.g. show an error message
        console.error('Error creating post:', error);
      }
    }
  });

  const handleTagInputKeyPress = event => {
    if (event.key === 'Enter') {
      const newTag = event.target.value.trim();
      if (newTag !== '' && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        event.target.value = ''; // Clear the input field
      }
    }
  };

  const onDeleteTag = tagIndex => {
    const newTagsList = tags.filter((value, index) => index !== tagIndex);
    setTags(newTagsList);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '1rem' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        Create a New Post
      </Typography>
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
      <TextField
        label="Tags"
        fullWidth
        name="tags"
        placeholder="Press Enter to add a tag"
        style={{ marginBottom: '1rem' }}
        onKeyDown={handleTagInputKeyPress}
      />
      <TagList tagNames={tags} onDeleteHandler={onDeleteTag} />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
        onClick={formik.handleSubmit}
      >
        Create Post
      </Button>
    </Container>
  );
};

export default CreatePost;
