import React, { useContext, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GoogleLoginButton from 'components/GoogleLogin';
import { Grid } from '@mui/material';
import ProfileDisplayName from 'components/profile/ProfileName';
import { useRouter } from 'next/router';
import { ProfileItems } from 'components/profile/ProfileItems';
import { authContext } from 'contexts/Auth';
import Image from 'next/image';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

export default function DefaultLayout({ children }) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { username } = useContext(authContext);

  const router = useRouter();

  const MenuIconButton = () => {
    if (!username) {
      return null
    }

    return <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawerOpen(true)}
              edge="start"
              sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
  }

  useEffect(() => {
    if (drawerOpen&&!username) {
      setDrawerOpen(false)
    }
  }, [username])

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <Grid container flexDirection="row" justifyContent="space-between">
            <MenuIconButton />
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => router.push('/')}
            >
              Posts page
            </Typography>
            <Box sx={{ display: 'flex', alignItems:"center"}}>
            <Image src="/website_logo.svg" alt="logo" width="40" height="40" />
            <Typography>
            Geppeta Boards
            </Typography>
            </Box>
            <GoogleLoginButton />
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
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <ProfileDisplayName />
        <ProfileItems />
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
