import React from 'react';
import { Typography, List, ListItem, Grid } from '@mui/material';
import PostMini from 'components/posts/PostMini';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import SortingMenu from 'components/dataManipulation/SortingSelector';
import {
  sortById,
  sortByScore
} from 'components/dataManipulation/SortFunctions';

const PostList = (posts = [], setPosts = () => {}) => {
  const router = useRouter();
  if (!posts) {
    return <Typography>Loading...</Typography>;
  }

  const sortingOptions = [
    {
      name: 'Sort by posting time',
      sideEffect: () => {
        setPosts(sortById(posts));
      }
    },
    {
      name: 'Sort by score',
      sideEffect: () => {
        setPosts(sortByScore);
      }
    }
  ];

  return (
    <Grid container alignItems="center" flexDirection="column">
      <Grid container direction="row" width="fit-content">
        <SortingMenu items={sortingOptions} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push({ pathname: `/posts/create` });
          }}
        >
          Create new post
        </Button>
      </Grid>

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
