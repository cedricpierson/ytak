import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

const DotsLeftMarquee = () => {
  return (
    <>
      <Marquee gradient={false}>
        <Typography variant="p" color="grey.800">
          {' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .{' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .{' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .{' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .{' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .{' '}
          . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
        </Typography>
      </Marquee>
    </>
  );
};

export default DotsLeftMarquee;
