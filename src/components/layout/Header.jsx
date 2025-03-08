// In src/components/layout/Header.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix the import for logout - it's likely in an auth slice or similar file
import { logout } from '../../features/auth/authSlice'; // Adjust the path as needed
import { ThemeContext } from '../../context/ThemeContext';

// Rest of your Header component remains the same

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';

function Header({ toggleSidebar, sidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { user } = useSelector((state) => state.auth);
  const { mode, toggleTheme } = useContext(ThemeContext);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Navigate to admin profile page
  const handleNavigateToProfile = () => {
    navigate('adminprofile'); // Adjust the path according to your route configuration
    handleClose();
  };

  const handleNavigateToSettings = () => {
    navigate('settings'); // Adjust the path according to your route configuration
    handleClose();
  };
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontSize: 18 }}>
          BU UNILERT
        </Typography>
        
        <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        
        <IconButton color="inherit" sx={{ mr: 2 }}>
          <NotificationsIcon />
        </IconButton>
        
        <Box>
          <Button
            onClick={handleClick}
            color="inherit"
            sx={{ textTransform: 'none' }}
            startIcon={
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={user?.name || 'User'}
                src="/static/avatar.jpg"
              />
            }
          >
            {user?.name || 'User'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
            <MenuItem onClick={handleNavigateToSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;