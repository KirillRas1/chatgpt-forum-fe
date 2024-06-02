// DefaultLayoutClientSide.js
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '@mui/material';
import ProfileDisplayName from 'components/profile/ProfileName';
import { useRouter } from 'next/navigation';
import { authContext } from 'contexts/Auth';
import Image from 'next/image';
import { GitHub } from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main')({
  flexGrow: 1,
  padding: '24px',
  transition: 'margin 0.3s ease',
  marginLeft: `-${drawerWidth}px`
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ open }) => ({
  transition: 'margin 0.3s ease',
  marginLeft: open ? `${drawerWidth}px` : 0
}));

const DrawerHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  height: '64px',
  justifyContent: 'flex-end'
});

function DefaultLayoutClientSide({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { displayName } = useContext(authContext);
  const router = useRouter();

  const MenuIconButton = () => {
    if (!displayName) {
      return null;
    }
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => setDrawerOpen(true)}
        edge="start"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
    );
  };

  useEffect(() => {
    if (drawerOpen && !displayName) {
      setDrawerOpen(false);
    }
  }, [displayName]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <MenuIconButton />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/website_logo.svg"
                alt="logo"
                width="40"
                height="40"
              />
              <Typography variant="h6">Geppeta Board</Typography>
              <IconButton href="https://github.com/KirillRas1/geppeta-board-fe">
                <GitHub />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
            >
              Home Page
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <ProfileDisplayName />
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

export default DefaultLayoutClientSide;
