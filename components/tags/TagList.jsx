import React from 'react';
import { Box, Typography } from '@mui/material';
import Tag from './Tag';

const tagListStyles = {
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1%' // Adjust the spacing between tags
  }
};

const TagList = ({ tagNames }) => {
  return (
    <Box style={tagListStyles.tagList}>
      {tagNames.map((tagName, index) => (
        <Tag key={index} name={tagName} />
      ))}
    </Box>
  );
};

export default TagList;
