import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Dashboard from '../../components/layouts/admin/nav/Dashboard';
import Head from 'next/head';
import dayjs from 'dayjs';
import AddUser from '../../components/layouts/user/AddUser';

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

const useFakeMutation = () => {
  return useCallback(
    (users) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (users.name?.trim() === '') {
            reject(new Error('Erreur lors de la sauvegarde: le champ ne peux pas être vide.'));
          } else {
            resolve({ ...users, name: users.name?.toUpperCase() });
          }
        }, 200)
      ),
    []
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const mutateRow = useFakeMutation();
  const [snackbar, setSnackbar] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleCloseSnackbar = () => setSnackbar(null);

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

  const processRowUpdate = useCallback(
    async (newRow) => {
      const dataToUpdate = {
        id: newRow.id,
        firstname: newRow.firstname,
        lastname: newRow.lastname,
        email: newRow.email,
        dayOfBirth: newRow.dayOfBirth,
        isPremium: newRow.isPremium,
        isAdmin: newRow.isAdmin,
        imageUrl: newRow.imageUrl,
      };

      axios
        .put(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/users/${newRow.id}`, dataToUpdate)
        .then((res) => {
          const updatedUsers = users.map((u) => {
            if (u.id === newRow.id) {
              return res.data;
            }
            return u;
          });
          setSnackbar({ children: 'Utilisateur modifié avec succès!', severity: 'success' });
          const reload = () => window.location.reload();
          reload();
        })
        .catch((error) => {
          setSnackbar({ children: error.message, severity: 'error' });
        });
      const response = await mutateRow(newRow);
      return response;
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const deleteRow = () => {
    selectionModel.map((row) => {
      axios
        .delete(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/users/${row}`)
        .then((res) => {
          const updatedUsers = users.map((u) => {
            if (u.id === row) {
              return res.data;
            }
            return u;
          });
          setSnackbar({ children: 'Utilisateur supprimé!', severity: 'success' });
          const reload = () => window.location.reload();
          reload();
        })
        .catch((error) => {
          setSnackbar({ children: error.message, severity: 'error' });
        });
    });
  };

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

          <div style={{ height: '90vh', width: '100%' }}>
            <AddUser selectionModel={selectionModel} deleteRow={deleteRow} />
            <DataGrid
              rows={users}
              loading={!users}
              components={{
                Toolbar: CustomToolbar,
              }}
              editMode="row"
              checkboxSelection
              processRowUpdate={(newRow) => processRowUpdate(newRow)}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              experimentalFeatures={{ newEditingApi: true }}
              columns={[
                { field: 'id', headerName: 'ID', editable: false, flex: 0.1 },
                { field: 'lastname', headerName: 'Nom', editable: true, flex: 1 },
                { field: 'firstname', headerName: 'Prénom', editable: true, flex: 1 },
                { field: 'email', headerName: 'Email', editable: true, flex: 1.5 },

                {
                  type: 'date',
                  field: 'dayOfBirth',
                  headerName: 'Date naissance',
                  editable: true,
                  flex: 1,
                  valueGetter: ({ value }) => value && new Date(value),
                },
                {
                  type: 'date',
                  field: 'firstConnect',
                  headerName: 'Date inscription',
                  editable: true,
                  flex: 1,
                  valueGetter: ({ value }) => value && new Date(value),
                },
                { type: 'boolean', field: 'isPremium', headerName: 'Premium', editable: true, flex: 0.6 },
                { type: 'boolean', field: 'isAdmin', headerName: 'Admin', editable: true, flex: 0.6 },
                { field: 'imageUrl', headerName: 'Image', editable: true, flex: 1 },
              ]}
            />
            {!!snackbar && (
              <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
              >
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
          </div>
        </Container>
      </Box>
    </>
  );
}
