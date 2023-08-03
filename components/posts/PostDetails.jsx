import React from 'react';
import { useRouter } from 'next/router'
import Comment from 'components/posts/Comment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Typography, Grid } from '@mui/material';


const PostDetails = (post={}, comments=[]) => {
const { title, author, content} = post;

const router = useRouter()
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => router.back()}>Close Post</Button>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="subtitle1">Author: {author}</Typography>
      <Typography variant="body1" >{content}</Typography>
      <Typography variant="h3">Comments:</Typography>
      <List>
        {comments.map((comment, index) => (
          <Comment author={comment.author} text={comment.text} index={index}/>
        ))}
      </List>
    </div>
  );
};

export default PostDetails;
