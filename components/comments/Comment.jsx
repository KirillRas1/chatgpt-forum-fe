import React, { useState, useContext, useMemo } from 'react';
import {
  Grid,
  Typography,
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Box
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { postContext } from 'contexts/Post';
import ScoreButtons from 'components/score/ScoreButtons';
import { authContext } from 'contexts/Auth';
import ReplyIcon from '@mui/icons-material/Reply';
import { setWith, isEmpty } from 'lodash';
import { randomColor } from 'functions/formatting/colors';

const Comment = ({ comment = {}, allowPrompt, readOnly }) => {
  const { apiClient } = useContext(authContext);
  const { getPostComments, setCommentToReply } = useContext(postContext);
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
        //getPostComments(comment.post);
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
            disabled={readOnly || isPrompt}
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
          <Typography variant="caption" color={'primary.main'}>
            {author || 'AI'}
          </Typography>
          <IconButton
            onClick={() => {
              setCommentToReply(comment);
            }}
          >
            <ReplyIcon fontSize="small" />
          </IconButton>

          {checkBox()}
          <Typography variant="body1" width="auto">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const CommentList = ({
  comments = [],
  readOnly = false,
  commentTree = {}
}) => {
  const allowPrompt = ({ comment = {} }) => {
    return comment.is_prompt || (comment.author && isEmpty(comment.children));
  };

  const formatCommentTree = () => {
    const localCommentTree = commentTree;
    if (comments && isEmpty(commentTree)) {
      for (const comment of comments) {
        const lodashPath = comment?.tree_path
          .flatMap((value, index) =>
            index > 0 ? ['children', value] : [value]
          )
          .join('.');
        setWith(localCommentTree, lodashPath, comment, Object);
      }
    }
    return localCommentTree;
  };

  const memoizedCommentTree = useMemo(
    () => formatCommentTree(),
    [comments, commentTree]
  );
  const renderCommentTree = () => {
    return Object.entries(memoizedCommentTree).map(
      ([id, comment] = value, index) => {
        const childrenComments = comment?.children;
        return (
          <ListItem key={index}>
            <Grid>
              <Comment
                comment={comment}
                allowPrompt={allowPrompt({ comment })}
                readOnly={readOnly}
              />
              {!isEmpty(childrenComments) && (
                <Grid container direction="row">
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={randomColor()}
                  />
                  <CommentList
                    readOnly={readOnly}
                    commentTree={childrenComments}
                  />
                </Grid>
              )}
            </Grid>
          </ListItem>
        );
      }
    );
  };
  return <List>{renderCommentTree()}</List>;
};

export default Comment;
