import React from 'react';
import { Typography, List, ListItem, Grid } from '@mui/material';
import PostMini from 'components/posts/PostMini';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const PostList = (posts = []) => {
  const router = useRouter();
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container alignItems="center" flexDirection="column">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          router.push({ pathname: `/posts/create` });
        }}
      >
        Create new post
      </Button>
      <Grid>
        <List>
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
