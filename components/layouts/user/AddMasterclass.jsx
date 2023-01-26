import React, { useState } from 'react';
import { TextField, Button, Modal, Card, Typography, Snackbar, Alert } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Container, Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import Backdrop from '@mui/material/Backdrop';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';

const AddMasterclass = ({ selectionModel, deleteRow }) => {
  const [newMasterclass, setNewMasterclass] = useState({});
  const [status, setStatus] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [checkedPremium, setCheckedPremium] = useState(false);
  const [checkedAdmin, setCheckedAdmin] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCheckedPremium = (event) => {
    setCheckedPremium(!checkedPremium);
    setNewMasterclass({ ...newMasterclass, isPremium: !checkedPremium });
  };

  const handleClickAway = () => {
    setOpenNew(false);
  };
  console.log(newMasterclass);

  const handleAddNewMasterclass = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_VITE_BACKEND_URL}/api/masterclass`, newMasterclass)
      .then((res) => {
        if (res.status === 201) {
          setSnackbar({ children: 'Masterclass enregistré avec succès!', severity: 'success' });
          setStatus(true);
          const reload = () => window.location.reload();
          reload();
        }
        if (res.status === 200) {
          setSnackbar({ children: 'Erreur de saisie', severity: 'warning' });
          setStatus(true);
        }
      })
      .catch((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
      });
  };
  return (
    <>
      {openNew && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Modal
            open={openNew}
            onClose={() => setOpenNew(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
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
                    Nouvelle Masterclass
                  </Typography>
                  <TextField
                    label="Chaîne"
                    value={newMasterclass.channel}
                    onChange={(event) => setNewMasterclass({ ...newMasterclass, channel: event.target.value })}
                  />
                  <TextField
                    label="Titre"
                    value={newMasterclass.title}
                    onChange={(event) => setNewMasterclass({ ...newMasterclass, title: event.target.value })}
                  />
                  <TextField
                    label="Playlist ID"
                    value={newMasterclass.playlistId}
                    onChange={(event) => setNewMasterclass({ ...newMasterclass, playlistId: event.target.value })}
                  />
                  <TextField
                    label="Catégorie ID"
                    value={newMasterclass.categoryId}
                    onChange={(event) => setNewMasterclass({ ...newMasterclass, categoryId: event.target.value })}
                  />

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPremium}
                          onChange={handleCheckedPremium}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label="Premium"
                      value={newMasterclass.isPremium}
                    />
                  </FormGroup>

                  <Button
                    variant="text"
                    onClick={handleAddNewMasterclass}
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
        </ClickAwayListener>
      )}
      {selectionModel.length === 0 ? (
        <Button onClick={() => setOpenNew(!openNew)}>Ajouter</Button>
      ) : (
        <Button sx={{ left: '-0.4rem' }} onClick={deleteRow}>
          <DeleteIcon />
        </Button>
      )}
    </>
  );
};

export default AddMasterclass;
