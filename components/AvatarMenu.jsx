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
  const router = useRouter();
  const signout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('isAdmin');
    router.push('/signin');
  };
  const handleProfile = () => router.push('/profil');

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', top: 30, right: 16 }}
        icon={
          <motion.div
            whileHover={{
              scale: 1.03,
              transition: {
                default: { ease: 'linear' },
              },
            }}
          >
            <Avatar alt="Avatar" src="/images/yavuz.jpg" sx={{ width: 72, height: 72, borderRadius: '50%' }} />
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
//   <motion.div
//     whileHover={{
//       scale: 1.03,
//       transition: {
//         default: { ease: 'linear' },
//       },
//     }}
//   >
//     <Button sx={{ top: '4px', borderRadius: '50%' }}>
//       <Paper sx={{ width: 72, height: 72, borderRadius: '50%' }} variant="outlined" elevation={12}>
//         <Avatar alt="Avatar" src="/images/yavuz.jpg" sx={{ width: 72, height: 72, borderRadius: '50%' }} />
//       </Paper>
//     </Button>
//   </motion.div>
