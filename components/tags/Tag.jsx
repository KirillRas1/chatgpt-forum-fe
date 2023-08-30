import React from 'react';
import { Box, Typography } from '@mui/material';

const Tag = ({ name }) => {
  const tagStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 4px', // Adjust padding as needed
    backgroundColor: '#F06292', // Change the color as needed
    borderRadius: '8px', // Rounded corners
    color: '#ffffff', // Text color
    fontSize: '16px',
    width: 'fit-content'
  };
  return (
    <Box style={tagStyle}>
      <Typography>{name}</Typography>
    </Box>
  );
};

export default Tag;

const tagListStyles = {
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1%' // Adjust the spacing between tags
  }
};

export const TagList = ({ tagNames }) => {
  return (
    <Box style={tagListStyles.tagList}>
      {tagNames.map((tagName, index) => (
        <Tag key={index} name={tagName} />
      ))}
    </Box>
  );
};
