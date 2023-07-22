import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostDetails from 'components/posts/PostDetails';
import {useRouter} from 'next/router';
import apiClient from 'infrastructure/apiClient';

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) return;
    apiClient.get(`/posts/${router.query.id}/`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [router.isReady]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return PostDetails(post);
};

export default PostPage;
