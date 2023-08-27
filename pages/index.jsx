import React, { useState, useEffect, useContext } from 'react';
import PostList from 'components/posts/PostList';
import { axiosContext } from 'contexts/Axios';
import { useRouter } from 'next/router';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { apiClient } = useContext(axiosContext);

  const router = useRouter();

  useEffect(() => {
    // Fetch the list of posts using Axios when the component mounts
    if (router.isReady) {
      apiClient
        .get('/posts/', { params: router.query })
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [router.query?.userId, router.isReady]);

  return PostList(posts);
};

export default PostsPage;
