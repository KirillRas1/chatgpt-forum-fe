import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import apiClient from 'infrastructure/apiClient';
import { postContext } from 'contexts/Post';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentInput = ({ postId }) => {
  const [comment, setComment] = useState('');
  const { comments, setComments } = useContext(postContext);
  const handleCommentChange = value => {
    setComment(value);
  };

  const postComment = () => {
    apiClient
      .post(`comments/`, {
        post: postId,
        text: comment
      })
      .then(response => {
        setComments([...comments, response.data]);
      })
      .catch(error => console.error('Error posting comment:', error))
      .finally(() => setComment(''));
  };

  return (
    <div>
      <ReactQuill value={comment} onChange={handleCommentChange} />
      <Button onClick={postComment}>Post Comment</Button>
    </div>
  );
};

export default CommentInput;
