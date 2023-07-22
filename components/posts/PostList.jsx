import React from 'react';
import Link from 'next/link';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router'

const PostList = (posts = []) => {
  if (!posts) {
    
    return <Typography>Loading...</Typography>;
  }
  const router = useRouter()
  const handlePostClick = (id) => () => {
    router.push({pathname: `/posts/${id}`})
  }
  return (
    <div>
      <Typography  variant="h2">Posts</Typography>
      <List>
      {posts.map((post) => (
          <ListItem key={post.id} onClick={handlePostClick(post.id)}>
            <Typography variant="h3">{post.title}</Typography>
            <Typography variant="body1">Author: {post.author}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PostList;