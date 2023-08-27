import React, { useState, useContext } from 'react';
import { Grid, Typography, Checkbox, CircularProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import { postContext } from 'contexts/Post';
import ScoreButtons from 'components/score/ScoreButtons';
import { axiosContext } from 'contexts/Axios';

const Comment = ({ comment = {}, allowPrompt }) => {
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
            disabled={isPrompt}
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

export default Comment;
