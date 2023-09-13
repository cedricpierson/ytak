import { Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import NavMarquee from '../components/navMarquee';
import DotsLeftMarquee from '../components/dotsLeftMarquee';
import DotsRightMarquee from '../components/dotsRightMarquee';
import AvatarMenu from '../components/AvatarMenu';
import axios from 'axios';
import ToTopScroll from '../components/regarder/ToTopScroll';
import FirstMotionLink from '../components/FirstMotionLink';
import SecondMotionLink from '../components/SecondMotionLink';
import ThirdMotionLink from '../components/ThirdMotionLink';
import dynamic from 'next/dynamic';

const VideoLine = dynamic(() => import('../components/regarder/VideoLine'), { ssr: false });

export async function getServerSideProps() {
  let playlists;
  let digital;
  let travailInde;
  let nature;

  //Playlists request
  await axios
    .get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`)
    .then((response) => {
      playlists = response.data;
    })
    .catch((err) => {
      console.error(err);
    });

  // Digital
  const playlistsDigital = playlists?.filter((playlist) => playlist.categoryId == 1);
  const digitalPromises = playlistsDigital.map((playlist) =>
    axios
      .get(
        `${process.env.NEXT_PUBLIC_YOUTUBE_ENDPOINT}/playlistItems?part=snippet&part=contentDetails&playlistId=${playlist.playlistId}&maxResults=9&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      .catch((err) => {
        S;
        console.error(err);
      })
  );
  digital = await Promise.all(digitalPromises)
    .then((results) => results.map((result) => result.data))
    .catch((err) => {
      console.error(err);
    });
  // Travail Indépendant
  const playlistsTravailInde = playlists?.filter((playlist) => playlist.categoryId == 2);
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
  // Nature
  const playlistsNature = playlists?.filter((playlist) => playlist.categoryId == 3);
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

  return {
    props: {
      digital,
      travailInde,
      nature,
    },
  };
}

const Regarder = ({ digital, travailInde, nature }) => {
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
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <div className="content">
        <Box sx={{ backgroundColor: 'grey.800', margin: '0' }}>
          <Box sx={{ margin: '0 2rem 0rem 1.8rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: 'grey.800',
                borderRadius: '10px',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', minHeight: '300px' }}>
                <div style={{ position: 'absolute', marginLeft: '1rem' }}>
                  <Link href="/">
                    <Typography variant="hs" fontFamily="Expletus Sans" color="grey.200" id="to-top">
                      YTAK
                    </Typography>
                    <Typography variant="h3" fontFamily="Expletus Sans" color="grey.200" mt="-1.2rem">
                      MasterClasses
                    </Typography>
                  </Link>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <video
                    src="/videos/ytakHero.mp4"
                    autoPlay
                    loop
                    muted
                    style={{ width: '100vw', maxHeight: '300px', objectFit: 'cover' }}
                  />
                </Box>
                <AvatarMenu />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ margin: '0 0 1.5rem 0' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              backgroundColor: 'grey.800',
            }}
          >
            <NavMarquee />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '0.5rem 3rem',
          }}
        >
          <FirstMotionLink />
        </Box>
        <>
          {digital && (
            <VideoLine
              data={digital}
              videoRef={videoRef}
              open={open}
              setOpen={setOpen}
              video={video}
              setVideo={setVideo}
              category={'digital'}
            />
          )}
        </>
        <DotsRightMarquee />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 3rem',
          }}
        >
          <SecondMotionLink />
        </Box>
        <>
          {travailInde && (
            <VideoLine
              data={travailInde}
              videoRef={videoRef}
              open={open}
              setOpen={setOpen}
              video={video}
              setVideo={setVideo}
              category={'travail-independant'}
            />
          )}
        </>
        <DotsLeftMarquee />
        <Box
          sx={{
            display: 'flex',
            // justifyContent: 'center',
            alignItems: 'center',
            margin: '0.5rem 3rem',
          }}
        >
          <ThirdMotionLink />
        </Box>
        <>
          {nature && (
            <VideoLine
              data={nature}
              videoRef={videoRef}
              open={open}
              setOpen={setOpen}
              video={video}
              setVideo={setVideo}
              category={'nature'}
            />
          )}
        </>
        {/* <DotsLeftMarquee /> */}
      </div>
      <ToTopScroll />
    </Stack>
  );
};

export default Regarder;
