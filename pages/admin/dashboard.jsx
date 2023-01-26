import { Box } from '@mui/material';
import React from 'react';
import DashboardContent from '../../components/layouts/admin/nav/Dashboard';
import Stats from '../../components/Stats';

const Dashboard = () => {
  const title = 'Dashboard';
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <DashboardContent title={title} />
        <Stats />
      </Box>
    </>
  );
};

export default Dashboard;
