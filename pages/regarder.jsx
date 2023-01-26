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

const PLAYLIST_ID = 'PL0vfts4VzfNgUUEtEjxDVfh4iocVR3qIb';

export async function getServerSideProps() {
  axios.get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`).then((response) => {
    const data = response.data;
    const digital = data.filter((item) => item.categoryId === 1);
    const travailInde = data.filter((item) => item.categoryId === 2);
    const nature = data.filter((item) => item.categoryId === 3);
    return { digital, travailInde, nature };
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}?part=snippet&part=contentDetails&playlistId=${PLAYLIST_ID}&maxResults=4&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Regarder = ({ data, digital, travailInde, nature }) => {
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
                <Typography variant="hs" fontFamily="Expletus Sans" color="grey.200">
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
          {/* <DotsRightMarquee /> */}
        </Box>
        <VideoLine data={data} videoRef={videoRef} open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
        <VideoLine data={data} videoRef={videoRef} open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
        <VideoLine data={data} videoRef={videoRef} open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
        <VideoLine data={data} videoRef={videoRef} open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
        {/* <DotsLeftMarquee /> */}
      </div>
    </Stack>
  );
};

export default Regarder;
