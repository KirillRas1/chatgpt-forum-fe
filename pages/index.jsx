import React, { useState, useEffect, useContext } from 'react';
import PostList from 'components/posts/PostList';
import { authContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { PostProvider } from 'contexts/Post';
const PostsPage = () => {
  return <PostProvider>
    <PostList/>
  </PostProvider>
};

export default PostsPage;
