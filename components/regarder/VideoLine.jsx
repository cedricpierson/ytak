import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { alpha } from '@mui/material';

const VideoLine = ({ data, videoRef, open, video, category }) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: '5px',
      }}
    >
      {!open &&
        data &&
        category &&
        data?.splice(1, 4).map((item) => {
          return (
            <motion.div
              key={item?.id}
              whileHover={{
                scale: 1.2,
                zIndex: '1',
                transition: {
                  default: { ease: 'linear' },
                },
              }}
              whileTap={{ scale: 0.8 }}
            >
              <Link href={`/${category}`}>
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: '1rem',
                    backgroundColor: 'grey.400',
                    borderRadius: '5px',
                    margin: '0.2rem',
                  }}
                >
                  {!open && (
                    <Image
                      width={item.items[0].snippet.thumbnails.medium.width}
                      height={item.items[0].snippet.thumbnails.medium.height}
                      src={item.items[0].snippet.thumbnails.medium.url}
                      alt=""
                    />
                  )}
                  <Typography
                    variant="p"
                    sx={{
                      position: 'absolute',
                      bottom: '0',
                      margin: '0.5rem 0.5rem 1rem 0.5rem',
                      color: 'grey.400',
                      backgroundColor: alpha('#000', 0.4),
                    }}
                  >
                    {item.items[0].snippet.title}
                  </Typography>
                </Button>
              </Link>
            </motion.div>
          );
        })}
      {open && (
        <iframe
          ref={videoRef}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video}`}
          title="Player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      )}
    </Grid>
  );
};

export default VideoLine;
