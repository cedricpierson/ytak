import { Avatar, Box, Card, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import NavMarquee from '../components/navMarquee';
import AvatarMenu from '../components/AvatarMenu';

const YOUTUBE_ENDPOINT = 'https://www.googleapis.com/youtube/v3/playlistItems';

const PLAYLIST_ID = 'PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb';

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_ENDPOINT}?part=snippet&part=contentDetails&playlistId=${PLAYLIST_ID}&maxResults=12&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Masterclass = ({ data }) => {
  const videoRef = useRef();
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');

  useEffect(() => {
    const handler = (e) => {
      if (open && videoRef.current && !videoRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [open]);

  return (
    <div style={{ backgroundColor: '#a5d6a7', height: '100%' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div class="content">
          <Box sx={{ margin: '2rem 3.2rem 1.5rem 1.8rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'grey.800',
                borderRadius: '10px 50px 50px 10px',
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.01,
                  transition: {
                    default: { ease: 'linear' },
                  },
                }}
              >
                <Link href="/regarder">
                  <Button
                    sx={{
                      height: '75px',
                      backgroundColor: 'primary.dark',
                      margin: '0.2rem',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    <Typography variant="h1" fontFamily="Expletus Sans" color="initial">
                      YTAK
                    </Typography>
                  </Button>
                </Link>
              </motion.div>
              <NavMarquee />

              <AvatarMenu />
            </Box>
            <Typography variant="h3" sx={{ margin: '1rem 1rem 0 1rem' }}>
              MasterClass avec <span style={{ color: '#519657' }}>{data.items[0].snippet.videoOwnerChannelTitle}</span>
            </Typography>
          </Box>
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
                    whileTap={{ scale: 1.75 }}
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
              <Box sx={{ backgroundColor: 'primary.main', height: '100vh' }}>
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
              </Box>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Masterclass;
