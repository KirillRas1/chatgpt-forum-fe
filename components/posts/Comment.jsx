import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Grid, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';


const Comment = ({ author, text, index }) => {
  return (
    <ListItem key={index}>
        <Grid container spacing={0.5}>
          {/* <Grid item xs={0}>
            <Divider orientation='vertical'/>
          </Grid> */}
        
          <Grid item xs={4}>
            <Divider />
            <Typography variant="caption" color={"primary.main"}>{author}</Typography >
            <Typography variant="body1" width="auto">{text}</Typography >
          </Grid>
        </Grid>
    </ListItem>
  );
};

export default Comment;
