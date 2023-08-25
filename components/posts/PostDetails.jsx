import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Comment from 'components/posts/Comment';
import { Grid, List, ListItem } from '@mui/material';
import { Button, Typography, TextField, Container } from '@mui/material';
import apiClient from 'infrastructure/apiClient';
import { postContext } from 'contexts/Post';
import CircleIcon from '@mui/icons-material/Circle';


const styles = {
  container: {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    marginBottom: '10px',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  content: {
    marginBottom: '20px',
  },
  commentInput: {
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#888',
    fontStyle: 'italic',
  },
};

const PostDetails = () => {
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const { post, comments, setComments } = useContext(postContext);
  const { id: postId, title, author, content, chat_role } = post;

  const changeComment = e => {
    setNewComment(e.target.value);
  };

  const postComment = () => {
    apiClient
      .post(`comments/`, {
        post: postId,
        text: newComment,
      })
      .then(response => {
        setComments([...comments, response.data]);
      })
      .catch(error => console.error('Error posting comment:', error))
      .finally(() => setNewComment(''));
  };

  const allowPrompt = ({ comment = {}, commentIndex }) => {
    return (
      comment.is_prompt ||
      (comment.author && commentIndex + 1 === comments.length)
    );
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <Grid style={styles.container}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => router.back()}
        style={styles.closeButton}
      >
        Close Post
      </Button>
      <div style={styles.titleWrapper}>
        <Typography variant="h2" style={styles.title}>
          {title}
        </Typography>
        <CircleIcon sx={{ fontSize: '30%', paddingRight:'1%', paddingLeft:'1%' }} />
        <Typography variant="subtitle1" style={styles.subtitle}>
          {author}
        </Typography>
      </div>
      <Typography variant="subtitle1">
        {chat_role}
      </Typography>
      <Typography variant="body1" style={styles.content}>
        {content}
      </Typography>
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
        style={styles.commentInput}
      />
      <Button onClick={postComment}>Post Comment</Button>
    </Grid>
  );
};

export default PostDetails;
