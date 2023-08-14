import React, { useState } from 'react';
import apiClient from 'infrastructure/apiClient';
import { Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const ScoreButtons = ({ foreignKey, scoreType, initialScore }) => {
  const [score, setScore] = useState(initialScore);
  console.log(score);
  const createScore = () => {
    apiClient
      .post(`/${scoreType}_score`, {
        [scoreType]: foreignKey,
        score: score
      })
      .catch(error => {
        setScore(0);
      });
  };

  const updateScore = () => {
    apiClient
      .patch(`/${scoreType}_score`, {
        params: { [scoreType]: foreignKey },
        score: score
      })
      .then(response => {
        setScore(-score);
      });
  };

  const deleteScore = () => {
    apiClient
      .delete(`/${scoreType}_score`, {
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
    <Grid container item direction="column" marginTop="1%">
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
