import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Typing from '../components/Typing';
import { motion } from 'framer-motion';

const index = () => {
  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div class="bg" />
        <div class="bg bg2" />
        <div class="bg bg3" />
        <div class="content">
          <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1" fontFamily="Expletus Sans" color="initial">
              YTAK
            </Typography>
            <motion.div
              animate={{ opacity: 0.5 }}
              transition={{
                opacity: { ease: 'easeOut' },
                layout: { duration: 0.3 },
              }}
            >
              <Typography variant="h2">
                <Typing />
              </Typography>
            </motion.div>
          </Stack>
        </div>
      </Container>
      <Stack
        sx={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: 'grey.800',
        }}
      >
        <Typography variant="h1" color="white">
          Plateforme E-LEARNING
        </Typography>
      </Stack>
    </>
  );
};

export default index;
