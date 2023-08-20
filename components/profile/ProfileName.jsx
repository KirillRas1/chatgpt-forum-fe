import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { authContext } from 'contexts/Auth';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import apiClient from 'infrastructure/apiClient';

function EditableTextField() {
  const [isEditing, setIsEditing] = useState(false);
  const { username, userId, setUser } = useContext(authContext);
  const [originalText, setOriginalText] = useState(username);
  const [editedText, setEditedText] = useState(username);
  
  useEffect(() => {
    setOriginalText(username);
    setEditedText(username);
  }, [username])

  const handleEditClick = () => {
    setIsEditing(true);
    console.log(editedText)
  };

  const handleDiscardClick = () => {
    setEditedText(originalText);
    setIsEditing(false);
  };

  const handleSubmitClick = () => {
    apiClient.patch(`users/${userId}/`, {
        name: editedText
    }).then(response => {
        setOriginalText(editedText);
        setUser(editedText);
    }).catch(error => {
        setEditedText(originalText)
    }).finally(() => {
        setIsEditing(false);
    })
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };

  return (
    <Grid container alignItems="center" direction="column">
    <Typography variant="caption">Profile:</Typography>
    <Grid container direction="row" wrap="nowrap" width="90%">
    {isEditing ? (
        <>
          <TextField
            fullWidth
            value={editedText}
            onChange={handleChange}
            variant="standard"
          />
          <IconButton onClick={handleSubmitClick} aria-label="Submit">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleDiscardClick} aria-label="Discard">
            <ClearIcon />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            fullWidth
            value={originalText}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <IconButton onClick={handleEditClick} aria-label="Edit">
            <EditIcon />
          </IconButton>
        </>
      )}
    </Grid>
    </Grid>
  );
}

export default EditableTextField;
