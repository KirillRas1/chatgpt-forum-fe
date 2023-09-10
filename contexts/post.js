import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { authContext } from 'contexts/Auth';

export const postContext = createContext();

export const PostProvider = ({ children }) => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentToReply, setCommentToReply] = useState(null);
  const { apiClient } = useContext(authContext);

  const getPostComments = postId => {
    return apiClient.get(`comments/tree`, { params: { post: postId } });
  };

  const getPost = async () => {
    if (router.query.id) {
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
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getPost()
    }
  }, [router.isReady]);

  

  const { Provider } = postContext;
  return (
    <Provider
      value={{
        post,
        comments,
        setComments,
        getPost,
        getPostComments,
        commentToReply,
        setCommentToReply
      }}
    >
      {children}
    </Provider>
  );
};
