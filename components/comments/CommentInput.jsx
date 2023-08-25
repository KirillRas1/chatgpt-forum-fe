import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = value => {
    setComment(value);
  };

  const handlePostComment = () => {
    onSubmit(comment);
    setComment('');
  };

  return (
    <div>
      <ReactQuill value={comment} onChange={handleCommentChange} />
      <Button onClick={handlePostComment}>Post Comment</Button>
    </div>
  );
};

export default CommentInput;
