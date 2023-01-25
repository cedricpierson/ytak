import React, { useState } from 'react';
import { TextField, Button, Modal, Card, Typography, Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Container, Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import axios from 'axios';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [status, setStatus] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  //   const handleClickAway = () => {
  //     setOpenNew(false);
  //   };

  const handleAddNewUser = () => {
    setUsers([...users, newUser]);
    setNewUser({});

    const postUser = async () => {
      axios
        .post(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/users`, newUser)
        .then((res) => {
          if (res.status === 200) {
            setSnackbar({ children: 'Utilisateur enregistré avec succès!', severity: 'success' });
            setStatus(true);
          }
        })
        .catch((error) => {
          setSnackbar({ children: error.message, severity: 'error' });
        });
    };
    postUser();
  };

  return (
    <>
      {openNew && (
        // <ClickAwayListener onClickAway={handleClickAway}>
        <Modal
          open={openNew}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row-reverse',
          }}
        >
          <Stack sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ padding: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',

                  gap: '0.5rem',
                }}
              >
                <Typography variant="h4" color="initial">
                  Nouvel utilisateur
                </Typography>
                <TextField
                  label="Prénom"
                  value={newUser.firstName}
                  onChange={(event) => setNewUser({ ...newUser, firstName: event.target.value })}
                />
                <TextField
                  label="NOM"
                  value={newUser.lastName}
                  onChange={(event) => setNewUser({ ...newUser, lastName: event.target.value })}
                />
                <TextField
                  label="Email"
                  value={newUser.email}
                  onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                />
                <TextField
                  label="Mot de Passe"
                  value={newUser.password}
                  onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Premium"
                    value={newUser.isPremium}
                    onChange={(event) => setNewUser({ ...newUser, isPremium: event.target.value })}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Admin"
                    value={newUser.isAdmin}
                    onChange={(event) => setNewUser({ ...newUser, isAdmin: event.target.value })}
                  />
                </FormGroup>
                <TextField
                  label="Image: Nom du fichier"
                  value={newUser.image}
                  onChange={(event) => setNewUser({ ...newUser, image: event.target.value })}
                />
                <Button
                  variant="text"
                  onClick={handleAddNewUser}
                  sx={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    color: '#fff',
                    '&:hover': { color: 'secondary.main' },
                    backgroundColor: 'secondary.main',
                  }}
                >
                  Valider
                </Button>
                {!!snackbar && (
                  <Snackbar
                    open={status}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                  >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                  </Snackbar>
                )}
              </div>
            </Card>
          </Stack>
        </Modal>
        // </ClickAwayListener>
      )}
      <Button onClick={() => setOpenNew(!openNew)}>Ajouter</Button>
    </>
  );
};

export default AddUser;
