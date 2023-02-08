import React from 'react';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import Typing from '../components/Typing';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Account from '../components/Account';

const index = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 5,
          ease: 'linear',
        },
      },
    },
  };

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

      <Box sx={{ position: 'relative', right: '100px', bottom: '100px' }}>
        <Link href="/signin">
          <Button
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              backgroundColor: 'primary.main',
              color: 'grey.800',
              '&:hover': {
                color: 'primary.lighter',
                backgroundColor: 'primary.darker',
              },
            }}
          >
            <Typography variant="h3">Entrer</Typography>
          </Button>
        </Link>
      </Box>
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
        <Marquee gradient={0} pauseOnHover>
          <Typography variant="h1" color="white" style={{ overflowY: 'hidden' }}>
            <Link href="/" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
              {' '}
              Digital{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
              {' '}
              Travail indé{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none' }}>
              {' '}
              Nature{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
              {' '}
              Digital{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
              {' '}
              Travail indé{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none' }}>
              {' '}
              Nature{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
              {' '}
              Digital{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
              {' '}
              Travail indé{' '}
            </Link>
            -
            <Link href="/" sx={{ textDecoration: 'none' }}>
              {' '}
              Nature{' '}
            </Link>
            -
          </Typography>
        </Marquee>
        {/* <Marquee gradient={0} pauseOnHover>
          <Typography variant="h1" color="white" style={{ overflowY: 'hidden' }}>
            Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme
            E-LEARNING.
          </Typography>
        </Marquee> */}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <Account />
      </Box>
    </>
  );
};

export default index;
