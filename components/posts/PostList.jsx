import React from 'react';
import Link from 'next/link';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const PostList = ({ posts = []}) => {
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography  variant="h2">Reddit Posts</Typography>
      <List>
        {posts.map((post) => (
          // <ListItem key={post.id} component={Link} href={`/posts/${post.id}`} passHref>
          //   <p>test {post.id}</p>
          //   <Typography variant="h3">{post.title}</Typography>
          //   <Typography variant="body1">Author: {post.author}</Typography>
          // </ListItem>
          <p>test {post.id}</p>
        ))}
      </List>
    </div>
  );
};

export default PostList;