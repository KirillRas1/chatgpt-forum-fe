import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';

const LoginDialog = ({ open, onClose }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle style={{ paddingBottom: '8px' }}>Login Required</DialogTitle>
      <div style={{ padding: '16px', textAlign: 'center' }}></div>
    </Dialog>
  );
};

export default LoginDialog;
