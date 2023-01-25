import React, { useState } from 'react';
import { TextField, Button, Modal, Card } from '@mui/material';
import { Container, Stack } from '@mui/system';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [openNew, setOpenNew] = useState(false);
  const handleClickAway = () => {
    setOpenNew(false);
  };

  const handleAddNewUser = () => {
    setUsers([...users, newUser]);
    setNewUser({});
  };

  return (
    <>
      {openNew && (
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
                <TextField
                  label="First Name"
                  value={newUser.firstName}
                  onChange={(event) => setNewUser({ ...newUser, firstName: event.target.value })}
                />
                <TextField
                  label="Last Name"
                  value={newUser.lastName}
                  onChange={(event) => setNewUser({ ...newUser, lastName: event.target.value })}
                />
                <TextField
                  label="Email"
                  value={newUser.email}
                  onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                />
              </div>
            </Card>
          </Stack>
        </Modal>
      )}
      <Button onClick={() => setOpenNew(!openNew)}>Ajouter</Button>
    </>
  );
};

export default AddUser;
