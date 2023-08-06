import React, { useMemo, useState } from 'react';
import { Grid, Typography, Checkbox, CircularProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import apiClient from 'infrastructure/apiClient';


const Comment = ({ comment={}, allowPrompt }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPrompt, setIsPrompt] = useState(false);
  const {author, text, id} = comment;
  const makePrompt = () => {
    if (isPrompt || isLoading) {
      return
    }
    setIsLoading(true)
    apiClient.patch(`comments/${id}/`, {
      is_prompt: true
    }).then((response) => {
      setIsLoading(false)
      console.log(response.data)
    })
  }

  const checkBox = () => {
    if (isLoading) {
      return <CircularProgress />
    }
    if (allowPrompt){
      return allowPrompt && <Checkbox checked={isPrompt} onChange={makePrompt}/>
    }
  }

  return (
        <Grid container spacing={0.5}>
          <Grid item xs={4}>
            <Divider />
            <Typography variant="caption" color={"primary.main"}>{author || "AI"}</Typography >
            {checkBox()}
            <Typography variant="body1" width="auto">{text}</Typography >
          </Grid>
        </Grid>
  );
};

export default Comment;
