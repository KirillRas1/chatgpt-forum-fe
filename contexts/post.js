import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiClient from 'infrastructure/api/apiClient';

export const postContext = createContext();

export const PostProvider = ({ children }) => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);

  const getPostComments = postId => {
    return apiClient.get(`comments/`, { params: { post: postId } });
  };

  const getPost = async () => {
    try {
      const [postResponse, commentsResponse] = await Promise.all([
        apiClient.get(`posts/${router.query.id}/`),
        getPostComments(router.query.id)
      ]);

      setPost(postResponse.data);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getPost();
    }
  }, [router.isReady]);

  const { Provider } = postContext;
  return (
    <Provider value={{ post, comments, setComments, getPost, getPostComments }}>
      {children}
    </Provider>
  );
};
