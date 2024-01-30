import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { authContext } from 'contexts/Auth';

function ProfileDisplayName() {
  const { username, userId, setUser } = useContext(authContext);
  const { apiClient } = useContext(authContext);
  const [originalText, setOriginalText] = useState('');
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    setOriginalText(username || '');
    setEditedText(username || '');
  }, [username]);

  const handleSubmitClick = () => {
    apiClient
      .patch(`users/${username}/`, {
        name: editedText
      })
      .then(response => {
        setOriginalText(editedText);
        setUser(editedText);
      })
      .catch(error => {
        setEditedText(originalText);
      })
  };

  const handleChange = event => {
    setEditedText(event.target.value);
  };

  return (
    <Grid container alignItems="center" direction="column">
      <Typography variant="caption">Profile:</Typography>
      <Grid container direction="row" wrap="nowrap" width="90%">
      <>
            <TextField
              fullWidth
              value={editedText}
              onChange={handleChange}
              variant="standard"
            />
            <IconButton onClick={handleSubmitClick} aria-label="Edit">
              <DoneIcon/>
            </IconButton>
          </>
      </Grid>
    </Grid>
  );
}

export default ProfileDisplayName;
