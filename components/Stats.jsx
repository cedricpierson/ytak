import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './dashboard/Chart';
import Vues from './dashboard/Vues';
import NbMasterclass from './dashboard/NbMasterclass';
import Utilisateurs from './dashboard/Utilisateurs';
import { Box, Toolbar } from '@mui/material';
import { Copyright } from '@mui/icons-material';

const Stats = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 120,
              }}
            >
              <Vues />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 120,
              }}
            >
              {' '}
              <NbMasterclass />
              {/* <Utilisateurs /> */}
            </Paper>
          </Grid>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
};

export default Stats;
