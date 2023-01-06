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

export default function Users() {
  const [users, setUsers] = useState([]);

  const [checkboxSelection, setCheckboxSelection] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const title = 'Utilisateurs';

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

          <div style={{ height: 300, width: '100%' }}>
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
                { field: 'id', headerName: 'ID', editable: true },
                { field: 'lastname', headerName: 'Nom', editable: true },
                { field: 'firstname', headerName: 'Prénom', editable: true },
                { field: 'email', headerName: 'Email', editable: true },
                { field: 'phone', headerName: 'Téléphone', editable: true },
                { field: 'lastConnect', headerName: 'Dernière connexion', editable: true },
                { field: 'dayOfBirth', headerName: 'Date de naissance', editable: true },
                { field: 'isPremium', headerName: 'Premium', editable: true },
              ]}
            />
          </div>
        </Container>
      </Box>
    </>
  );
}
