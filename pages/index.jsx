import React, { useState, useEffect } from 'react';
import PostList from 'components/posts/PostList';
import { axiosContext } from 'contexts/Axios';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { apiClient } = useContext(axiosContext);
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
