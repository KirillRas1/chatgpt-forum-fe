import React, { useState, useEffect, use } from 'react';
import { useParams } from 'react-router-dom';

import PostDetails from 'components/posts/PostDetails';
import {useRouter} from 'next/router';
import apiClient from 'infrastructure/apiClient';

const PostPage = () => {
  const params = useParams();
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

  return PostDetails(post, comments);
};

export default PostPage;
