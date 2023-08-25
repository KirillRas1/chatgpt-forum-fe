import React, { useState, useEffect } from 'react';
import apiClient from 'infrastructure/api/apiClient';
import PostList from 'components/posts/PostList';
const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the list of posts using Axios when the component mounts
    apiClient
      .get('/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return PostList(posts);
};

export default PostsPage;
