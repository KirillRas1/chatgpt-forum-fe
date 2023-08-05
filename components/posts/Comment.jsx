import React from 'react';
import { Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';


const Comment = ({ author, text, index }) => {
  return (
        <Grid container spacing={0.5}>
          {/* <Grid item xs={0}>
            <Divider orientation='vertical'/>
          </Grid> */}
        
          <Grid item xs={4}>
            <Divider />
            <Typography variant="caption" color={"primary.main"}>{author || "AI"}</Typography >
            <Typography variant="body1" width="auto">{text}</Typography >
          </Grid>
        </Grid>
  );
};

export default Comment;
