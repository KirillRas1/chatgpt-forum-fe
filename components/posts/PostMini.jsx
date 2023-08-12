import React, { useMemo } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Box
} from '@mui/material';
import { getFormattedTimedelta } from 'functions/formatting/time';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CircleIcon from '@mui/icons-material/Circle';

const PostMini = ({ post }) => {
  const renderItems = () => {
    return (
      <Grid container justifyContent="space-between">
        <Typography variant="h4">{post.title}</Typography>
        <Grid container gap={2}>
          <Typography variant="body1">{post.author}</Typography>
          <CircleIcon sx={{ fontSize: '50%', marginTop: '1%' }} />
          <Typography variant="body1">
            {getFormattedTimedelta(Date.parse(post.created_at))}
          </Typography>
        </Grid>
        <Divider />
      </Grid>
    );
  };
  return (
    <Grid container direction="row">
      <Grid container item flexDirection="column">
        <ThumbUpIcon />
        <ThumbDownIcon />
      </Grid>
      {renderItems()}
    </Grid>
  );
};
export default PostMini;
