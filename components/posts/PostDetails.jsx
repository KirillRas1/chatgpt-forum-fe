import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Comment from 'components/posts/Comment';
import { Grid, List, ListItem } from '@mui/material';
import { Button, Typography, TextField } from '@mui/material';
import apiClient from 'infrastructure/apiClient';
import { postContext } from 'contexts/Post';

const PostDetails = () => {
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const { post, comments, setComments } = useContext(postContext);
  const { id: postId, title, author, content } = post;
  const changeComment = e => {
    setNewComment(e.target.value);
  };

  const postComment = () => {
    apiClient
      .post(`comments/`, {
        post: postId,
        text: newComment
      })
      .then(response => {
        setComments([...comments, response.data]);
      })
      .catch(error => console.error('Error fetching posts:', error))
      .finally(setNewComment(''));
  };

  const allowPrompt = ({ comment = {}, commentIndex }) => {
    return (
      comment.is_prompt ||
      (comment.author && // Human author
        commentIndex + 1 === comments.length)
    ); // Last comment of the post
  };
  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <Grid item width="70%">
      <Button variant="outlined" color="primary" onClick={() => router.back()}>
        Close Post
      </Button>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="subtitle1">Author: {author}</Typography>
      <Typography variant="body1">{content}</Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <Comment
              comment={comment}
              allowPrompt={allowPrompt({ comment, commentIndex: index })}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        variant="outlined"
        value={newComment}
        onChange={changeComment}
      />
      <Button onClick={postComment}>Post Comment</Button>
    </Grid>
  );
};

export default PostDetails;
