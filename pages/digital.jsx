import React, { useState, useEffect, useRef, useContext } from 'react';
import { alpha, Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import NavMarquee from '../components/navMarquee';
import AvatarContext from '../context/AvatarContext';
import axios from 'axios';

export async function getServerSideProps() {
  let playlists;
  let digital;
  await axios
    .get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`)
    .then((response) => {
      playlists = response.data;
    })
    .catch((err) => {
      console.error(err);
    });

  const playlistsDigital = playlists.filter((playlist) => playlist.categoryId === 1);
  const digitalPromises = playlistsDigital.map((playlist) =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${playlist.playlistId}&maxResults=9&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .catch((err) => {
        console.error(err);
      })
  );
  digital = await Promise.all(digitalPromises)
    .then((results) => results.map((result) => result.data))
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      digital,
    },
  };
}

const Digital = ({ digital }) => {
  const videoRef = useRef();
  const { values } = useContext(AvatarContext);
  const avatar = `http://localhost:5001/${values?.currentUser?.imageUrl}`;
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
    <div style={{ backgroundColor: '#d6a5d4', height: '100%' }}>
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
                    <Avatar alt="Avatar" src={avatar} sx={{ width: 63, height: 63, borderRadius: '50%' }} />
                  </Button>
                </motion.div>
              </Link>
            </Box>
            <Typography variant="h3" sx={{ margin: '1rem 1rem 0 1rem', color: '#bd64bb' }}>
              DIGITAL
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
              digital?.map((item) => {
                return (
                  <Link href={`/masterclasses/${item.items[0].snippet.playlistId}`} key={item.id}>
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
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   setOpen(true);
                        //   setVideo(item.contentDetails.videoId);
                        // }}
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

                          <br />
                        </Typography>
                      </Button>
                    </motion.div>
                  </Link>
                );
              })}
            {open && (
              <Box sx={{ backgroundColor: 'secondary.main', height: '100vh' }}>
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

export default Digital;
