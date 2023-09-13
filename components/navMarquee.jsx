import React from 'react';
import { Link, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

const NavMarquee = () => {
  return (
    <>
      <Marquee gradient={false} pauseOnHover style={{ marginRight: '0.3rem' }}>
        <Typography variant="h2" color="white" style={{ overflowY: 'hidden' }}>
          <Link href="/digital" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            {' '}
            Digital{' '}
          </Link>
          -
          <Link href="/travail-independant" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
            {' '}
            Travail indé{' '}
          </Link>
          -
          <Link href="/nature" sx={{ textDecoration: 'none' }}>
            {' '}
            Nature{' '}
          </Link>
          -
          <Link href="/digital" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            {' '}
            Digital{' '}
          </Link>
          -
          <Link href="/travail-independant" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
            {' '}
            Travail indé{' '}
          </Link>
          -
          <Link href="/nature" sx={{ textDecoration: 'none' }}>
            {' '}
            Nature{' '}
          </Link>
          -
          <Link href="/digital" sx={{ textDecoration: 'none', color: 'secondary.main' }}>
            {' '}
            Digital{' '}
          </Link>
          -
          <Link href="/travail-independant" sx={{ textDecoration: 'none', color: '#C7C1C7' }}>
            {' '}
            Travail indé{' '}
          </Link>
          -
          <Link href="/nature" sx={{ textDecoration: 'none' }}>
            {' '}
            Nature{' '}
          </Link>
          -
        </Typography>
      </Marquee>
    </>
  );
};

export default NavMarquee;
