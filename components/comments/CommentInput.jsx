import React, { useState, useContext } from 'react';
import { Button, TextField, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { postContext } from 'contexts/Post';
import { authContext } from 'contexts/Auth';

const CommentInput = ({ postId }) => {
  const [comment, setComment] = useState('');
  const { comments, setComments, commentToReply, setCommentToReply } =
    useContext(postContext);
  const { apiClient } = useContext(authContext);

  const postComment = () => {
    if (comment) {
      apiClient
        .post(`comments/`, {
          post: postId,
          text: comment,
          parent: commentToReply?.id || undefined
        })
        .then(response => {
          const commentWithExtraData = {
            ...response.data,
            tree_path: commentToReply
              ? commentToReply.tree_path.concat(response.data.id)
              : [response.data.id]
          };
          setComments([...comments, commentWithExtraData]);
        })
        .catch(error => console.error('Error posting comment:', error))
        .finally(() => {
          setComment('');
          setCommentToReply(null);
        });
    }
  };

  const closeReply = () => {
    setCommentToReply(null);
  };

  return (
    <div>
      {commentToReply && (
        <div
          style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
        >
          <TextField
            variant="outlined"
            value={commentToReply.text}
            fullWidth
            InputProps={{ readOnly: true }}
            disabled
          />
          <IconButton onClick={closeReply} aria-label="Close Reply">
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <TextField
        variant="outlined"
        value={comment}
        onChange={e => setComment(e.target.value)}
        fullWidth
      />
      <Button onClick={postComment}>Post Comment</Button>
    </div>
  );
};

export default CommentInput;
