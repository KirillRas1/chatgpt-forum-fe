import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Comment from 'components/comments/Comment';
import { Grid, List, ListItem } from '@mui/material';
import { Button, Typography } from '@mui/material';

import { postContext } from 'contexts/Post';
import CircleIcon from '@mui/icons-material/Circle';
import CommentInput from 'components/comments/CommentInput';

const styles = {
  container: {
    width: '70%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  closeButton: {
    marginBottom: '10px'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  content: {
    marginBottom: '20px'
  },
  commentInput: {
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#888',
    fontStyle: 'italic'
  }
};

const PostDetails = () => {
  const router = useRouter();
  const { post, comments } = useContext(postContext);
  const { id: postId, title, author, content, chat_role } = post;

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
        <CircleIcon
          sx={{ fontSize: '30%', paddingRight: '1%', paddingLeft: '1%' }}
        />
        <Typography variant="subtitle1" style={styles.subtitle}>
          {author}
        </Typography>
      </div>
      <Typography variant="subtitle1">{chat_role}</Typography>
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
      <CommentInput postId={postId} />
    </Grid>
  );
};

export default PostDetails;
