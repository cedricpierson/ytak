import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function NbMasterclass() {
  const [masterclass, setmasterclass] = useState([]);

  useEffect(() => {
    const adminData = {
      isAdmin: localStorage.getItem('isAdmin'),
      accessToken: localStorage.getItem('accessToken'),
    };
    const getData = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`)
        .then((res) => {
          setmasterclass(res.data);
        })
        .catch((error) => console.error(error));
    };
    getData();
  }, []);
  return (
    <>
      <Typography component="p" variant="h4">
        <span style={{ color: '#d6a5d4' }}>{masterclass.length}</span> Masterclass
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        En ligne
      </Typography>
    </>
  );
}
