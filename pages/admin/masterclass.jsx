import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Typography, Box, Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Dashboard from '../../components/layouts/admin/nav/Dashboard';
import Head from 'next/head';

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button onClick={() => window.location.reload()}>
        <CachedIcon />
        Actualiser
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Masterclass() {
  const [masterclass, setMasterclass] = useState([]);

  const [checkboxSelection, setCheckboxSelection] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/masterclass')
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

          <div style={{ height: '90vh', width: '100%' }}>
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
                { field: 'id', headerName: 'ID', editable: true, flex: 0.1 },
                { field: 'channel', headerName: 'Chaîne', editable: true, flex: 0.3 },
                { field: 'title', headerName: 'Titre', editable: true, flex: 0.4 },
                { field: 'playlistId', headerName: 'Playlist ID', editable: true, flex: 0.5 },
                { field: 'categoryId', headerName: 'Catégorie', editable: true, align: 'center', flex: 0.16 },
                {
                  type: 'boolean',
                  field: 'isPremium',
                  headerName: 'Premium',
                  editable: true,
                  align: 'center',
                  flex: 0.16,
                },
              ]}
            />
          </div>
        </Container>
      </Box>
    </>
  );
}
