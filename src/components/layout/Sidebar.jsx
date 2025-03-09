// src/components/layout/Sidebar.jsx (Enhanced version with larger text)

import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  Collapse,
  ListItemButton,
  Typography,
  useTheme,
  Badge,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SOSIcon from '@mui/icons-material/SosOutlined';
import { useState } from 'react';

const drawerWidth = 280; // Increased width further for bigger text

function Sidebar({ open }) {
  const location = useLocation();
  const theme = useTheme();
  const [incidentsOpen, setIncidentsOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const handleIncidentsClick = () => {
    setIncidentsOpen(!incidentsOpen);
  };

  const handleCommunicationClick = () => {
    setCommunicationOpen(!communicationOpen);
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f8f9fa',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ p: 1 }}>
          <ListItem
            button
            component={RouterLink}
            to="/"
            selected={location.pathname === '/'}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ fontSize: 25 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Dashboard
                </Typography>
              } 
            />
          </ListItem>
          

          {/* Incidents Section */}
          <ListItemButton 
            onClick={handleIncidentsClick}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
          
            <ListItemIcon>
              <WarningIcon sx={{ fontSize: 28 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Incidents
                </Typography>
              } 
            />
            {incidentsOpen ? <ExpandLess sx={{ fontSize: 28 }} /> : <ExpandMore sx={{ fontSize: 28 }} />}
          </ListItemButton>
          <Collapse in={incidentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem
                button
                component={RouterLink}
                to="/incidents"
                selected={location.pathname === '/incidents'}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  py: 1.2, // More vertical padding
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <WarningIcon sx={{ fontSize: 26 }} /> {/* Larger icon */}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontSize="1.2rem">
                      Incident List
                    </Typography>
                  } 
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/dispatch"
                selected={location.pathname === '/dispatch'}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  py: 1.2, // More vertical padding
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <SendIcon sx={{ fontSize: 26 }} /> {/* Larger icon */}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontSize="1.2rem">
                      Dispatch System
                    </Typography>
                  } 
                />
              </ListItem>
            </List>
          </Collapse>

          {/* Communication Section */}
          <ListItemButton 
            onClick={handleCommunicationClick}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <ChatIcon sx={{ fontSize: 28 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Communication
                </Typography>
              } 
            />
            {communicationOpen ? <ExpandLess sx={{ fontSize: 28 }} /> : <ExpandMore sx={{ fontSize: 28 }} />}
          </ListItemButton>
          <Collapse in={communicationOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              <ListItem
                button
                component={RouterLink}
                to="/chat"
                selected={location.pathname === '/chat'}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  py: 1.2, // More vertical padding
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <ChatIcon sx={{ fontSize: 26 }} /> {/* Larger icon */}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontSize="1.2rem">
                      Chat System
                    </Typography>
                  } 
                />
              </ListItem>
              <ListItem
                button
                component={RouterLink}
                to="/calling"
                selected={location.pathname === '/calling'}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  py: 1.2, // More vertical padding
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>
                  <PhoneIcon sx={{ fontSize: 26 }} /> {/* Larger icon */}
                </ListItemIcon>
                <ListItemText 
                  primary={
                    <Typography variant="body1" fontSize="1.2rem">
                      Calling System
                    </Typography>
                  } 
                />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            component={RouterLink}
            to="/alerts"
            selected={location.pathname === '/alerts'}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <NotificationsActiveIcon sx={{ fontSize: 28 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Alerts
                </Typography>
              } 
            />
          </ListItem>

          <ListItem
            button
            component={RouterLink}
            to="/users"
            selected={location.pathname === '/users'}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ fontSize: 28 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Users
                </Typography>
              } 
            />
          </ListItem>
          <ListItem
  button
  component={RouterLink}
  to="/SOSreport"
  selected={location.pathname === '/sos'}
  sx={{
    py: 1.5,
    '&.Mui-selected': {
      backgroundColor: 'action.selected',
      borderRight: '3px solid',
      
      borderColor: 'error.main', // Use error color to highlight importance
    },
  }}
>
  <ListItemIcon>
    <Badge color="error" variant="dot" invisible={false}>
      <NotificationsActiveIcon color="error" />
    </Badge>
  </ListItemIcon>
  <ListItemText 
    primary={
      <Typography fontWeight={800} color="error">SOS Emergencies</Typography>
    } 
  />
</ListItem>
          <Divider sx={{ my: 1.5 }} />

          <ListItem
            button
            component={RouterLink}
            to="/settings"
            selected={location.pathname === '/settings'}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              py: 1.5, // More vertical padding
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ fontSize: 28 }} /> {/* Larger icon */}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontSize="1.3rem" fontWeight={500}>
                  Settings
                </Typography>
              } 
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;