import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Typography } from '@mui/material';

export default function SecondMotionLink() {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        zIndex: '1',
        transition: {
          default: { ease: 'linear' },
        },
      }}
      whileTap={{ scale: 0.8 }}
    >
      <Link href="/travail-independant">
        <Typography variant="h4" color="grey.800">
          Travail Indépendant
        </Typography>
      </Link>
    </motion.div>
  );
}
