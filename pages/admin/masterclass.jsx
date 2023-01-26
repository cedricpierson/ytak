import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Container, Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import Dashboard from '../../components/layouts/admin/nav/Dashboard';
import AddMasterclass from '../../components/layouts/user/AddMasterclass';
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

const useFakeMutation = () => {
  return useCallback(
    (users) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (users.name?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...users, name: users.name?.toUpperCase() });
          }
        }, 200)
      ),
    []
  );
};

export default function Masterclass() {
  const [masterclass, setMasterclass] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
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
        .get(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`)
        .then((res) => {
          setMasterclass(res.data);
        })
        .catch((error) => console.error(error));
    };
    getData();
  }, []);

  const processRowUpdate = useCallback(
    async (newRow) => {
      const dataToUpdate = {
        id: newRow.id,
        channel: newRow.channel,
        title: newRow.title,
        playlistId: newRow.playlistId,
        isPremium: newRow.isPremium,
        categoryId: newRow.categoryId,
      };
      console.log(dataToUpdate);
      axios
        .put(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass/${newRow.id}`, dataToUpdate)
        .then((res) => {
          const updatedmasterclass = masterclass.map((u) => {
            if (u.id === newRow.id) {
              return res.data;
            }
            return u;
          });
          // setUsers(updatedUsers);
          setSnackbar({ children: 'Masterclass modifiée avec succès!', severity: 'success' });
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
        .delete(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass/${row}`)
        .then((res) => {
          const updatedUsers = masterclass.map((u) => {
            if (u.id === row) {
              return res.data;
            }
            return u;
          });
          setSnackbar({ children: 'Masterclass supprimé!', severity: 'success' });
          const reload = () => window.location.reload();
          reload();
        })
        .catch((error) => {
          setSnackbar({ children: error.message, severity: 'error' });
        });
    });
  };

  const title = 'Masterclasses';

  return (
    <>
      <Head>
        <title> Masterclasses | YTAK </title>
      </Head>
      <Box sx={{ display: 'flex' }}>
        <Dashboard title={title} />

        <Container style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Masterclasses
          </Typography>

          <div style={{ height: '90vh', width: '100%' }}>
            <AddMasterclass selectionModel={selectionModel} deleteRow={deleteRow} />
            <DataGrid
              rows={masterclass}
              loading={!masterclass}
              components={{
                Toolbar: CustomToolbar,
              }}
              editMode="row"
              checkboxSelection={checkboxSelection}
              processRowUpdate={(newRow) => processRowUpdate(newRow)}
              onProcessRowUpdateError={handleProcessRowUpdateError}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              experimentalFeatures={{ newEditingApi: true }}
              columns={[
                { field: 'id', headerName: 'ID', editable: false, flex: 0.1 },
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
