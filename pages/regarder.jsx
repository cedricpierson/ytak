import { Avatar, Box, Card, Container, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavMarquee from '../components/navMarquee';
import DotsLeftMarquee from '../components/dotsLeftMarquee';
import DotsRightMarquee from '../components/dotsRightMarquee';
import AvatarMenu from '../components/AvatarMenu';
import axios from 'axios';
import VideoLine from '../components/regarder/VideoLine';
import { motion } from 'framer-motion';
import ToTopScroll from '../components/regarder/ToTopScroll';

const PLAYLIST_ID = 'PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb';

export async function getServerSideProps() {
  let playlists;
  let digital;
  let travailInde;
  let nature;

  //Digital playlists request
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

  const playlistsTravailInde = playlists.filter((playlist) => playlist.categoryId === 2);
  const travailIndePromises = playlistsTravailInde.map((playlist) =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${playlist.playlistId}&maxResults=9&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .catch((err) => {
        console.error(err);
      })
  );
  travailInde = await Promise.all(travailIndePromises)
    .then((results) => results.map((result) => result.data))
    .catch((err) => {
      console.error(err);
    });

  const playlistsNature = playlists.filter((playlist) => playlist.categoryId === 3);
  const NaturePromises = playlistsNature.map((playlist) =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${playlist.playlistId}&maxResults=9&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .catch((err) => {
        console.error(err);
      })
  );
  nature = await Promise.all(NaturePromises)
    .then((results) => results.map((result) => result.data))
    .catch((err) => {
      console.error(err);
    });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${PLAYLIST_ID}&maxResults=4&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      data,
      digital,
      travailInde,
      nature,
    },
  };
}

const Regarder = ({ data, digital, travailInde, nature }) => {
  const videoRef = useRef();
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');
  console.log(digital[0].items[0]);

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
    <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="bg" />
      <div class="bg bg2" />
      <div class="bg bg3" />
      <div class="content">
        <Box sx={{ backgroundColor: 'grey.800', height: '350px', margin: '0' }}>
          <Box sx={{ margin: '2rem 3.2rem 1.5rem 1.8rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'grey.800',
                borderRadius: '10px',
              }}
            >
              <Link href="/">
                <Typography variant="hs" fontFamily="Expletus Sans" color="grey.200" id="to-top">
                  YTAK
                </Typography>
                <Typography variant="h3" fontFamily="Expletus Sans" color="grey.200" mt="-1.5rem">
                  MasterClasses
                </Typography>
              </Link>

              <AvatarMenu />
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: '0 0 1.5rem 0' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: 'grey.800',
            }}
          >
            <NavMarquee />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 2rem',
          }}
        >
          <Typography variant="h4" color="grey.800">
            Les + vues
          </Typography>
        </Box>
        <VideoLine
          data={digital}
          videoRef={videoRef}
          open={open}
          setOpen={setOpen}
          video={video}
          setVideo={setVideo}
          category={'digital'}
        />
        <DotsLeftMarquee />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 2rem',
          }}
        >
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
            <Link href="/digital">
              <Typography variant="h4" color="grey.800">
                Digital
              </Typography>
            </Link>
          </motion.div>
        </Box>
        <VideoLine
          data={digital}
          videoRef={videoRef}
          open={open}
          setOpen={setOpen}
          video={video}
          setVideo={setVideo}
          category={'digital'}
        />
        <DotsRightMarquee />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 2rem',
          }}
        >
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
        </Box>
        <VideoLine
          data={travailInde}
          videoRef={videoRef}
          open={open}
          setOpen={setOpen}
          video={video}
          setVideo={setVideo}
          category={'travail-independant'}
        />
        <DotsLeftMarquee />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 2rem',
          }}
        >
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
            <Link href="/nature">
              <Typography variant="h4" color="grey.800">
                Nature
              </Typography>
            </Link>
          </motion.div>
        </Box>
        <VideoLine
          data={nature}
          videoRef={videoRef}
          open={open}
          setOpen={setOpen}
          video={video}
          setVideo={setVideo}
          category={'nature'}
        />
        {/* <DotsLeftMarquee /> */}
      </div>
      <ToTopScroll />
    </Stack>
  );
};

export default Regarder;
