import React from 'react';
import { Typography, Grid, Divider, Container, Box } from '@mui/material';
import { getFormattedTimedelta } from 'functions/formatting/time';
import CircleIcon from '@mui/icons-material/Circle';
import ScoreButtons from 'components/score/ScoreButtons';
import { useRouter } from 'next/navigation';
import TagList from 'components/tags/TagList';

const PostMini = ({ post }) => {
  const router = useRouter();

  const handlePostClick = id => () => {
    router.push({ pathname: `/posts/${id}` });
  };
  const renderItems = () => {
    return (
      <Grid container justifyContent="space-between">
        <Grid container direction="row">
          <Typography
            variant="h4"
            onClick={handlePostClick(post.id)}
            sx={{ cursor: 'pointer' }}
          >
            {post.title}
          </Typography>
          <TagList tagNames={post.tags || []} />
        </Grid>
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
    <Grid container wrap="nowrap">
      <ScoreButtons
        foreignKey={post.id}
        scoreType={'post'}
        initialScore={post.user_score}
        initialTotalScore={post.total_score}
      />
      <Divider orientation="vertical" flexItem />
      {renderItems()}
    </Grid>
  );
};
export default PostMini;
