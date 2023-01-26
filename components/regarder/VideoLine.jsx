import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button, Grid } from '@mui/material';

const VideoLine = ({ data, videoRef, open, setOpen, video, setVideo }) => {
  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: '5px',
          overflowX: 'hidden',
        }}
      >
        {!open &&
          data.items.map((item) => {
            const { id, snippet = {}, contentDetails = {} } = item;
            const { videoId } = contentDetails;
            const { title, thumbnails = {} } = snippet;
            const { medium = {} } = thumbnails;
            return (
              <motion.div
                whileHover={{
                  scale: 1.2,
                  zIndex: '1',
                  transition: {
                    default: { ease: 'linear' },
                  },
                }}
                whileTap={{ scale: 0.8 }}
              >
                <Button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                    setVideo(item.contentDetails.videoId);
                  }}
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
                  {!open && <Image width={medium.width} height={medium.height} src={medium.url} alt="" />}
                </Button>
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
    </div>
  );
};

export default VideoLine;
