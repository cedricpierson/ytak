import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar } from '@mui/material';
import Link from 'next/link';

const actions = [
  { icon: <AccountCircleIcon sx={{ color: 'primary.main' }} />, name: 'Profil' },
  { icon: <LogoutIcon sx={{ color: 'primary.main' }} />, name: 'Déconnexion' },
];

export default function AvatarMenu() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const avatar = '/images/yavuz.jpg'; /*`http://localhost:5001/${values?.currentUser?.imageUrl}`*/
  const router = useRouter();
  const signout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('isAdmin');
    router.push('/signin');
  };
  const handleProfile = () => router.push('/profil');

  return (
    <Box sx={{ height: 115, marginRight: '-1.4rem', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: 'absolute',
          top: { xs: 20, sm: 30 },
          right: { xs: '1.5rem', sm: '2.5rem' },
        }}
        icon={
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: {
                default: { ease: 'linear' },
              },
            }}
          >
            <Avatar
              alt="Avatar"
              src={avatar}
              sx={{ width: { xs: 50, sm: 72 }, height: { xs: 50, sm: 72 }, borderRadius: '50%' }}
            />
          </motion.div>
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
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
    </Box>
  );
}
