import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Typography, List, ListItem, Grid, Pagination } from '@mui/material';
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

const POSTS_PER_PAGE = 20

const PostList = () => {
  const router = useRouter();
  const { apiClient, loginStatus } = useContext(authContext);
  const { page, setPage, totalPages, setTotalPages, posts, setPosts } = useContext(postContext);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);
  const dummyPosts = {
    "count": 3,
    "next": null,
    "previous": null,
    "results": [
      {
        "id": 11,
        "author": "morbidCamel0",
        "title": "Interactive story",
        "created_at": "2024-01-23T11:35:01.892359Z",
        "user_score": -1,
        "total_score": -1,
        "chat_role": "Write dark fantasy story, keep your messages around 5 sentences",
        "tags": [],
        "prompt_mode": "score"
      },
      {
        "id": 7,
        "author": "culturedTermite4",
        "title": "D&D game",
        "created_at": "2024-01-21T09:03:56.212167Z",
        "user_score": 1,
        "total_score": 2,
        "chat_role": "You are a dungeon master in a D&D game",
        "tags": [
          "RPG"
        ],
        "prompt_mode": "author"
      },
      {
        "id": 8,
        "author": "culturedTermite4",
        "title": "Programming together",
        "created_at": "2024-01-21T12:25:45.725418Z",
        "user_score": 1,
        "total_score": 2,
        "chat_role": "You are a programming assistant",
        "tags": [
          "Programming"
        ],
        "prompt_mode": "author"
      }
    ]
  }
  useEffect(() => {
    if (router.isReady) {
      // const postsUrl = page === null ? '/posts/' : `/posts/?page=${page}`
      // apiClient
      //   .get(postsUrl, { params: router.query })
      //   .then(response => {
      //     setPosts(response.data.results);
      //     setTotalPages(Math.ceil(response.data.count / POSTS_PER_PAGE))
      //   })
      //   .catch(error => console.error('Error fetching posts:', error));
      setPosts(dummyPosts)
      setTotalPages(1)
    }
  }, [router.query, router.isReady, page, loginStatus]);

  const handlePageChange = (event, value) => {
    setPage(value)
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
        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      </Grid>
    </Grid>
  );
};

export default PostList;
