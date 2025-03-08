// src/components/layout/MainLayout.jsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar open={sidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Remove all padding
          pt: 2, // Add just a bit of top padding
          pl: 0, // No left padding
          pr: 2, // Keep right padding
          pb: 2, // Keep bottom padding
          mt: 8, // Space below header
          marginLeft: sidebarOpen ? '20px' : -20, // Account for sidebar width
          transition: 'margin-left 0.2s',
          overflow: 'auto',
          height: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;