import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Typography, Box } from '@mui/material';
import Dashboard from '../../components/layouts/admin/nav/Dashboard';
import Head from 'next/head';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Masterclass() {
  const [masterclass, setMasterclass] = useState([]);

  const [checkboxSelection, setCheckboxSelection] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/masterclass')
      .then((res) => {
        setMasterclass(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const title = 'Masterclass';

  return (
    <>
      <Head>
        <title> Masterclass | YTAK </title>
      </Head>
      <Box sx={{ display: 'flex' }}>
        <Dashboard title={title} />

        <Container style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Masterclass
          </Typography>

          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={masterclass}
              loading={!masterclass}
              components={{
                Toolbar: CustomToolbar,
              }}
              // editMode="row"
              checkboxSelection={checkboxSelection}
              experimentalFeatures={{ newEditingApi: true }}
              columns={[
                { field: 'id', headerName: 'ID', editable: true },
                { field: 'channel', headerName: 'Chaîne', editable: true },
                { field: 'title', headerName: 'Titre', editable: true },
                { field: 'playlistId', headerName: 'Playlist ID', editable: true },
                { field: 'categoryId', headerName: 'Catégorie', editable: true, align: 'center' },
                { field: 'isPremium', headerName: 'Premium', editable: true, align: 'center' },
              ]}
            />
          </div>
        </Container>
      </Box>
    </>
  );
}
