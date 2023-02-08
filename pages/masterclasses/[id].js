import { Avatar, Box, Card, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import NavMarquee from '../../components/navMarquee';
import AvatarMenu from '../../components/AvatarMenu';
import { alpha } from '@mui/material';

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`);
  const playlists = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = playlists.map((playlist) => ({
    params: { id: playlist.playlistId },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${params.id}&maxResults=9&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const playlist = await res.json();
  return { props: { playlist } };
}

const Masterclass = ({ playlist }) => {
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
    <Stack sx={{ backgroundColor: 'grey.800', height: '100%' }}>
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
              <Link href="/profil">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    transition: {
                      default: { ease: 'linear' },
                    },
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: 'secondary.main',
                      margin: '0.2rem 0.2rem 0.2rem -0.3rem',
                      borderRadius: '50%',
                    }}
                  >
                    <Avatar alt="Avatar" src="/images/yavuz.jpg" sx={{ width: 63, height: 63, borderRadius: '50%' }} />
                  </Button>
                </motion.div>
              </Link>
            </Box>
            <Typography variant="h3" sx={{ margin: '1rem 1rem 0 1rem', color: '#bd64bb' }}>
              Masterclass avec <span style={{ color: '#fff' }}>{playlist.items[0].snippet.videoOwnerChannelTitle}</span>
            </Typography>
            <Typography variant="h6" sx={{ margin: '0.5rem 1rem 1rem 1rem', color: '#bd64bb' }}>
              <span style={{ color: '#fff' }}>{playlist.items[0].snippet.title}</span>
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
              playlist.items.map((item) => {
                const { id, snippet = {}, contentDetails = {} } = item;
                const { videoId } = contentDetails;
                const { title, thumbnails = {} } = snippet;
                const { medium = {} } = thumbnails;
                return (
                  <motion.div
                    key={item.id}
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
                        position: 'relative',
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
                      <Typography
                        variant="p"
                        sx={{
                          position: 'absolute',
                          bottom: '0',
                          margin: '0.5rem 0.5rem 1rem 0.5rem',
                          color: '#bd64bb',
                          backgroundColor: alpha('#000', 0.3),
                        }}
                      >
                        <span style={{ color: '#fff' }}>{item.snippet.description.split('\n', 1)[0].slice(0, 80)}</span>
                      </Typography>
                    </Button>
                  </motion.div>
                );
              })}
            {open && (
              <Box sx={{ backgroundColor: 'inherit', height: '100vh' }}>
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
    </Stack>
  );
};

export default Masterclass;
