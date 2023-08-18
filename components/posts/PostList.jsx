import React from 'react';
import { Typography, List, ListItem, Grid } from '@mui/material';
import PostMini from 'components/posts/PostMini';

const PostList = (posts = []) => {
  
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container alignItems="center" flexDirection="column">
      <Typography variant="h2">Posts</Typography>
      <Grid container item xs={6}>
        <List sx={{ width: '100%' }}>
          {posts.map(post => (
            <ListItem key={post.id}>
              <PostMini post={post} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default PostList;
