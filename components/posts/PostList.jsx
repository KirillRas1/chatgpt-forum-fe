import React, { useMemo } from 'react';
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
import { getFormattedTimedelta } from 'functions/formatting/time';
import CircleIcon from '@mui/icons-material/Circle';

const PostList = (posts = []) => {
  const router = useRouter();
  const handlePostClick = id => () => {
    router.push({ pathname: `/posts/${id}` });
  };
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container alignItems="center" flexDirection="column">
      <Typography variant="h2">Posts</Typography>
      <Grid container item xs={6}>
        <List sx={{ width: '100%' }}>
          {posts.map(post => (
            <ListItem key={post.id} onClick={handlePostClick(post.id)}>
              <Grid
                container
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="h4">{post.title}</Typography>
                <Grid container gap={2}>
                  <Typography variant="body1">{post.author}</Typography>
                  <CircleIcon sx={{ fontSize: '50%', marginTop: '1%' }} />
                  <Typography variant="body1">
                    {getFormattedTimedelta(Date.parse(post.created_at))}
                  </Typography>
                </Grid>
                <Divider />
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default PostList;
