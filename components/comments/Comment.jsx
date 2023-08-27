import React, { useState, useContext } from 'react';
import {
  Grid,
  Typography,
  Checkbox,
  CircularProgress,
  List,
  ListItem
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { postContext } from 'contexts/Post';
import ScoreButtons from 'components/score/ScoreButtons';
import { axiosContext } from 'contexts/Axios';

const Comment = ({ comment = {}, allowPrompt, readOnly }) => {
  const { apiClient } = useContext(axiosContext);
  const { getPostComments } = useContext(postContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrompt, setIsPrompt] = useState(comment.is_prompt);
  const { author, text, id } = comment;
  const makePrompt = () => {
    if (isPrompt || isLoading) {
      return;
    }
    setIsLoading(true);
    apiClient
      .patch(`comments/${id}/`, {
        is_prompt: true
      })
      .then(response => {
        setIsPrompt(true);
        getPostComments(comment.post);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkBox = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    if (allowPrompt) {
      return (
        allowPrompt && (
          <Checkbox
            checked={isPrompt}
            disabled={readOnly || isPrompt}
            onChange={makePrompt}
          />
        )
      );
    }
  };
  return (
    <Grid container direction="row" wrap="nowrap" alignContent="flex-start">
      <ScoreButtons
        foreignKey={comment.id}
        scoreType={'comment'}
        initialScore={comment.user_score}
      />
      <Grid container spacing={0.5}>
        <Grid item>
          <Divider />
          <Typography variant="caption" color={'primary.main'}>
            {author || 'AI'}
          </Typography>
          {checkBox()}
          <Typography variant="body1" width="auto">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const CommentList = ({ comments = [], readOnly = false }) => {
  const allowPrompt = ({ comment = {}, commentIndex }) => {
    return (
      comment.is_prompt ||
      (comment.author && commentIndex + 1 === comments.length)
    );
  };

  return (
    <List>
      {comments.map((comment, index) => (
        <ListItem key={index}>
          <Comment
            comment={comment}
            allowPrompt={allowPrompt({ comment, commentIndex: index })}
            readOnly={readOnly}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Comment;
