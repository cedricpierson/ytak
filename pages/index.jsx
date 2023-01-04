import React from 'react';
import { Container, Link, Stack, Typography } from '@mui/material';
import Typing from '../components/Typing';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

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
            -<Link href="/"> Nature </Link>-
          </Typography>
        </Marquee>
        {/* <Marquee gradient={0} pauseOnHover>
          <Typography variant="h1" color="white" style={{ overflowY: 'hidden' }}>
            Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme E-LEARNING. Plateforme
            E-LEARNING.
          </Typography>
        </Marquee> */}
      </Stack>
    </>
  );
};

export default index;
