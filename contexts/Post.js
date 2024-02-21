'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authContext } from 'contexts/Auth';

export const postContext = createContext();

export const PostProvider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.toString());
  const [post, setPost] = useState({});
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentToReply, setCommentToReply] = useState(null);
  const { apiClient, loginStatus } = useContext(authContext);

  const getPostComments = postId => {
    return apiClient.get(`comments/tree`, { params: { post: postId } });
  };

  const getCommentTree = parentCommentId => {
    return apiClient.get(`comments/tree`, {
      params: { parent_id: parentCommentId }
    });
  };

  const getPost = async () => {
    if (searchParams.toString()) {
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
    console.log(searchParams.toString());
    getPost();
  }, [loginStatus]);

  const { Provider } = postContext;
  return (
    <Provider
      value={{
        post,
        comments,
        setComments,
        getPost,
        getPostComments,
        getCommentTree,
        commentToReply,
        setCommentToReply,
        posts,
        setPosts,
        totalPages,
        setTotalPages,
        page,
        setPage
      }}
    >
      {children}
    </Provider>
  );
};
