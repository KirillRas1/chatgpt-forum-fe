import React, { useState, useEffect, use } from 'react';

import PostDetails from 'components/posts/PostDetails';
import {useRouter} from 'next/router';
import apiClient from 'infrastructure/apiClient';
import Grid from '@mui/material/Unstable_Grid2';
const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter()
  
  useEffect(() => {
    if (!router.isReady) return;
    apiClient.get(`/posts/${router.query.id}/`)
      .then((response) => {
        setPost(response.data)
        apiClient.get(`/comments/`).then((response) => {
          setComments(response.data)
        })})
      .catch((error) => console.error('Error fetching post:', error));
  }, [router.isReady]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <Grid container spacing={2}>
      {PostDetails(post, comments)}
    </Grid>
  )
  
};

export default PostPage;
