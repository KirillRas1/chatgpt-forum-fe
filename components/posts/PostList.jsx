import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Typography, List, ListItem, Grid } from '@mui/material';
import PostMini from 'components/posts/PostMini';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import DataHandlingMenu from 'components/dataManipulation/DataManipulationMenu';
import {
  sortById,
  sortByScore
} from 'components/dataManipulation/SortFunctions';
import {
  getTimeThresholds,
  getTimeThresholdsDict
} from 'functions/formatting/time';
import { filterOlderThan } from 'components/dataManipulation/FilterFunctions';
import { postContext } from 'contexts/Post';
import { authContext } from 'contexts/Auth';

const PostList = () => {
  const router = useRouter();
  const { apiClient } = useContext(authContext);
  const { posts, setPosts } = useContext(postContext);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (router.isReady) {
      apiClient
        .get('/posts/', { params: router.query })
        .then(response => {
          setPosts(response.data.results);
          setTotalPages(response.data.count)
          setPreviousPostPage(response.data.previous)
          setNextPostPage(response.data.next)
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [router.query, router.isReady]);

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

  const filteringOptions = useMemo(
    () =>
      getTimeThresholdsDict().map(thresholdDict => ({
        name: thresholdDict.name,
        sideEffect: () => {
          setFilteredPosts(filterOlderThan(posts, thresholdDict.time));
        }
      })),
    [posts]
  );

  if (!posts) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container alignItems="center" flexDirection="column">
      <Grid container direction="row" width="fit-content">
        <DataHandlingMenu items={sortingOptions} label={'Sort'} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push({ pathname: `/posts/create` });
          }}
        >
          Create new post
        </Button>
        <DataHandlingMenu items={filteringOptions} label={'Filter'} />
      </Grid>

      <Grid>
        <List>
          {filteredPosts.map(post => (
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
