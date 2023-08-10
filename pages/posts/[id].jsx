import { PostProvider } from 'contexts/post';
import PostDetails from 'components/posts/PostDetails';
import Grid from '@mui/material/Unstable_Grid2';

const PostPage = () => {
  return (
    <Grid container spacing={2}>
      <PostProvider>
        <PostDetails />
      </PostProvider>
    </Grid>
  );
};

export default PostPage;
