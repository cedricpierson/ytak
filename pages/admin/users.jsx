import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Typography, Box, Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Dashboard from '../../components/layouts/admin/nav/Dashboard';
import Head from 'next/head';
import dayjs from 'dayjs';

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

export default function Users() {
  const [users, setUsers] = useState([]);

  const [checkboxSelection, setCheckboxSelection] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const title = 'Utilisateurs';

  function getCar(params) {
    return `${params.cars.model}`;
  }

  return (
    <>
      <Head>
        <title> Utilisateurs | YTAK </title>
      </Head>
      <Box sx={{ display: 'flex' }}>
        <Dashboard title={title} />

        <Container style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Utilisateurs
          </Typography>

          <div style={{ height: '90vh', width: '100%' }}>
            {console.log(users)}

            <DataGrid
              rows={users}
              loading={!users}
              components={{
                Toolbar: CustomToolbar,
              }}
              // editMode="row"
              checkboxSelection={checkboxSelection}
              experimentalFeatures={{ newEditingApi: true }}
              columns={[
                { field: 'id', headerName: 'ID', editable: true, flex: 0.1 },
                { field: 'lastname', headerName: 'Nom', editable: true, flex: 1 },
                { field: 'firstname', headerName: 'Prénom', editable: true, flex: 1 },
                { field: 'email', headerName: 'Email', editable: true, flex: 1.5 },
                {
                  type: 'date',
                  field: 'firstConnect',
                  headerName: "Date d'inscription",
                  editable: true,
                  flex: 1,
                  valueGetter: ({ value }) => value && new Date(value),
                },
                {
                  type: 'date',
                  field: 'dayOfBirth',
                  headerName: 'Date de naissance',
                  editable: true,
                  flex: 1,
                  valueGetter: ({ value }) => value && new Date(value),
                },
                { type: 'boolean', field: 'isPremium', headerName: 'Premium', editable: true, flex: 0.6 },
              ]}
            />
          </div>
        </Container>
      </Box>
    </>
  );
}
