import React, { useState } from 'react';
import apiClient from 'infrastructure/apiClient';
import { Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ScoreButtons = ({ foreignKey, scoreType, initialScore }) => {
  const [score, setScore] = useState(initialScore);
  const createScore = (targetScore) => {
    apiClient
      .post(`/${scoreType}_score/`, {
        [scoreType]: foreignKey,
        upvote: targetScore === 1 ? true : false
      }).then(
        setScore(targetScore)
      )
      .catch(error => {
        setScore(0);
      });
  };

  const updateScore = () => {
    apiClient
      .patch(`/${scoreType}_score/`, {
        params: { [scoreType]: foreignKey },
        upvote: score === 1 ? false : true,
        comment: foreignKey
      })
      .then(response => {
        setScore(-score);
      });
  };

  const deleteScore = () => {
    apiClient
      .delete(`/${scoreType}_score/`, {
        params: { [scoreType]: foreignKey }
      })
      .then(response => {
        setScore(0);
      });
  };

  const handleScoreClick = targetScore => () => {
    if (score === targetScore) {
      deleteScore();
    } else if (score === -targetScore) {
      updateScore();
    } else {
      createScore(targetScore);
    }
  };

  return (
    <Grid item marginTop="1%">
      <ThumbUpIcon
        color={score === 1 ? 'primary' : undefined}
        onClick={handleScoreClick(1)}
      />
      <ThumbDownIcon
        color={score === -1 ? 'primary' : undefined}
        onClick={handleScoreClick(-1)}
      />
    </Grid>
  );
};

export default ScoreButtons;
