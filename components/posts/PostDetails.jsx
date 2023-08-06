import React, {useContext, useState} from 'react';
import { useRouter } from 'next/router'
import Comment from 'components/posts/Comment';
import {List, ListItem} from '@mui/material';
import { Button, Typography, TextField } from '@mui/material';
import apiClient from 'infrastructure/apiClient';
import {postContext} from 'contexts/post'


const PostDetails = ({post={}}) => {
const { id:postId, title, author, content} = post;
const [newComment, setNewComment] = useState('')
const router = useRouter()
const {comments, setComments} = useContext(postContext)
const changeComment = (e) => {
  setNewComment(e.target.value)
}

const postComment = () => {
  apiClient.post(`comments/`, {
    post_id: postId,
    text: newComment,
  })
      .then((response) => {
        setComments([...comments, response.data])
    })
      .catch((error) => console.error('Error fetching posts:', error));
}

const allowPrompt = ({comment={}, commentIndex}) => {
  return comment.author// Human author
  && commentIndex+1 === comments.length // Last comment of the post
  && !comment.is_prompt // Already submitted as a prompt
}

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => router.back()}>Close Post</Button>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="subtitle1">Author: {author}</Typography>
      <Typography variant="body1" >{content}</Typography>
      <Typography variant="h3">Comments:</Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index}>
            <Comment comment={comment} allowPrompt={allowPrompt({comment, commentIndex: index})}/>
          </ListItem>
        ))}
      </List>
      <TextField id="standard-basic" label="Standard" variant="standard" value={newComment} onChange={changeComment}/>
      <Button onClick={postComment}>Post Comment</Button>
    </div>
  );
};

export default PostDetails;
