import React from 'react';
import Link from 'next/link';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider
} from '@mui/material';
import { useRouter } from 'next/router';

const PostList = (posts = []) => {
  const router = useRouter();
  const handlePostClick = id => () => {
    router.push({ pathname: `/posts/${id}` });
  };
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <div>
      <Typography variant="h2">Posts</Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.id} onClick={handlePostClick(post.id)}>
            <Grid container directon="row" justifyContent="space-between">
              <Typography variant="h3">{post.title}</Typography>
              <Grid item>
                <Typography variant="body1">
                  {Date.parse(post.created_at)}
                </Typography>
                <Typography variant="body1">Author: {post.author}</Typography>
              </Grid>
            </Grid>
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PostList;
