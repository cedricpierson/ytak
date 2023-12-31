import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Vues() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const adminData = {
      isAdmin: localStorage.getItem('isAdmin'),
      accessToken: localStorage.getItem('accessToken'),
    };
    const getData = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/users`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((error) => console.error(error));
    };
    getData();
  }, []);
  return (
    <>
      <Typography component="p" variant="h4">
        <span style={{ color: '#d6a5d4' }}>{users.length}</span> utilisateurs
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Inscrits
      </Typography>
    </>
  );
}
