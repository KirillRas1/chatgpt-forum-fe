import React, { useState, useEffect, useContext } from 'react';
import PostList from 'components/posts/PostList';
import { axiosContext } from 'contexts/Axios';
import { useRouter } from 'next/router';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { apiClient } = useContext(axiosContext);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get('/posts/', { params: router.query })
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [router.query, router.isReady]);

  return PostList(posts, setPosts);
};

export default PostsPage;
