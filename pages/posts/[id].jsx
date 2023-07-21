import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetails from 'components/posts/PostDetails';

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the post data using Axios when the component mounts
    console.log(params)
    // axios.get(`/posts/${id}`)
    //   .then((response) => setPost(response.data))
    //   .catch((error) => console.error('Error fetching post:', error));
  }, []);

  if (!post) {
    return <p>Loading...</p>;
  }

  return PostDetails(post);
};

export default PostPage;
