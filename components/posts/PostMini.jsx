import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import { getFormattedTimedelta } from 'functions/formatting/time';
import CircleIcon from '@mui/icons-material/Circle';
import ScoreButtons from 'components/score/ScoreButtons';

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
    <Grid container wrap="no-wrap">
      <ScoreButtons foreignKey={post.id} scoreType={'post'} initialScore={0} />
      {renderItems()}
    </Grid>
  );
};
export default PostMini;
