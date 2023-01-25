import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SideNav from './SideNav';
import { ArrowRight, Settings } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material';

const actions = [
  { icon: <AccountCircleIcon sx={{ color: 'primary.main' }} />, name: 'Profil' },
  { icon: <LogoutIcon sx={{ color: 'primary.main' }} />, name: 'Déconnexion' },
];

function Copyright(props) {
  return (
    <Typography variant="body2" color="primary.main" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://cdc.com/">
        CDC Media
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent({ title }) {
  const [open, setOpen] = useState(true);
  const [openOptions, setOpenOptions] = useState(false);
  const handleOpen = () => setOpenOptions(true);
  const handleClose = () => setOpenOptions(false);
  const handleProfile = () => router.push('/profile');
  const router = useRouter();
  const signout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('isAdmin');
    router.push('/signin');
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Backdrop open={openOptions} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{ position: 'absolute', top: 4, right: 16 }}
            icon={
              <Tooltip title="Paramètres" component="a" href="/admin/profil">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            }
            onClose={handleClose}
            onOpen={handleOpen}
            open={openOptions}
            direction="down"
          >
            <SpeedDialAction
              key={actions[0].name}
              icon={actions[0].icon}
              tooltipTitle={actions[0].name}
              tooltipOpen
              onClick={handleProfile}
            />

            <SpeedDialAction
              key={actions[1].name}
              icon={actions[1].icon}
              tooltipTitle={actions[1].name}
              tooltipOpen
              onClick={signout}
            />
          </SpeedDial>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <SideNav />
        </List>
      </Drawer>
    </Box>
  );
}

export default function Dashboard({ title }) {
  return <DashboardContent title={title} />;
}
