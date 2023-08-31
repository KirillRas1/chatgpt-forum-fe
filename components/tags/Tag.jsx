import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const Tag = ({ name, onDeleteHandler }) => {
  return (
    <Box>
      <Chip label={name} onDelete={onDeleteHandler} />
    </Box>
  );
};

export default Tag;
