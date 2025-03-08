import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  ThemeProvider,
  createTheme,
  InputAdornment,
  Badge as MuiBadge,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ChatIcon from '@mui/icons-material/Chat';
import VideocamIcon from '@mui/icons-material/Videocam';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FilterListIcon from '@mui/icons-material/FilterList';
import { format } from 'date-fns';

// Custom theme with refined typography and colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0055a5',
      light: '#3378b8',
      dark: '#003c74',
    },
    secondary: {
      main: '#E53935',
      light: '#FF6F60',
      dark: '#AB000D',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2A2F35',
      secondary: '#505967',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '2.2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.8rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.2rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '1.05rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0, 85, 165, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 85, 165, 0.25)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          height: '32px',
          fontWeight: 500,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
        },
      },
    },
  },
});

function CallingSystem() {
  const [activeCall, setActiveCall] = useState(null);
  const [showCallHistory, setShowCallHistory] = useState(false);
  const [emergencyContactsOpen, setEmergencyContactsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState(null);

  // Updated emergency contacts with consistent styling
  const emergencyContacts = [
    {
      id: 1,
      name: 'Campus Security',
      number: '555-0100',
      department: 'Security',
      avatar: 'https://img.icons8.com/color/96/security-shield.png',
      description: 'Main campus security line',
    },
    {
      id: 2,
      name: 'Medical Center',
      number: '555-0101',
      department: 'Medical',
      avatar: 'https://img.icons8.com/color/96/hospital.png',
      description: '24/7 campus medical services',
    },
    {
      id: 3,
      name: 'Fire Department',
      number: '555-0102',
      department: 'Fire',
      avatar: 'https://img.icons8.com/color/96/firefighter.png',
      description: 'Campus fire emergency',
    },
    {
      id: 4,
      name: 'Mental Health Crisis',
      number: '555-0103',
      department: 'Medical',
      avatar: 'https://img.icons8.com/color/96/mental-health.png',
      description: 'Mental health support line',
    },
    {
      id: 5,
      name: 'Maintenance Emergency',
      number: '555-0104',
      department: 'Facilities',
      avatar: 'https://img.icons8.com/color/96/maintenance.png',
      description: 'Urgent facility issues',
    },
  ];

  // Updated security officers to match chat system
  const securityOfficers = [
    {
      id: 101,
      name: 'Officer James',
      number: '555-0201',
      position: 'Security Team Lead',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'available',
      department: 'Security',
    },
    {
      id: 102,
      name: 'Officer Sarah',
      number: '555-0202',
      position: 'Patrol Officer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'available',
      department: 'Security',
    },
    {
      id: 103,
      name: 'Officer Rodriguez',
      number: '555-0203',
      position: 'Main Entrance Security',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      status: 'on call',
      department: 'Security',
    },
    {
      id: 104,
      name: 'Officer Patel',
      number: '555-0204',
      position: 'Security Camera Monitor',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      status: 'available',
      department: 'Security',
    },
    {
      id: 105,
      name: 'Officer Michael',
      number: '555-0205',
      position: 'Patrol Officer',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'off duty',
      department: 'Security',
    },
    {
      id: 106,
      name: 'Officer Lisa',
      number: '555-0206',
      position: 'Dispatch',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      status: 'available',
      department: 'Security',
    },
  ];

  const callHistory = [
    {
      id: 1,
      name: 'Medical Center',
      number: '555-0101',
      time: '2025-03-05T14:30:00Z',
      duration: '4:32',
      type: 'outgoing',
      avatar: 'https://img.icons8.com/color/96/hospital.png',
      department: 'Medical',
    },
    {
      id: 2,
      name: 'Officer James',
      number: '555-0201',
      time: '2025-03-05T11:15:00Z',
      duration: '2:17',
      type: 'incoming',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      department: 'Security',
    },
    {
      id: 3,
      name: 'Fire Department',
      number: '555-0102',
      time: '2025-03-04T09:45:00Z',
      duration: '5:03',
      type: 'outgoing',
      avatar: 'https://img.icons8.com/color/96/firefighter.png',
      department: 'Fire',
    },
    {
      id: 4,
      name: 'Officer Rodriguez',
      number: '555-0203',
      time: '2025-03-03T16:22:00Z',
      duration: '3:45',
      type: 'incoming',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      department: 'Security',
    },
    {
      id: 5,
      name: 'Officer Patel',
      number: '555-0204',
      time: '2025-03-03T10:05:00Z',
      duration: '1:30',
      type: 'outgoing',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      department: 'Security',
    },
  ];

  useEffect(() => {
    if (activeCall && activeCall.status === 'connected') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallTimer(timer);
      return () => clearInterval(timer);
    } else if (callTimer) {
      clearInterval(callTimer);
    }
  }, [activeCall]);

  const startCall = (contact) => {
    setCallDuration(0);
    setActiveCall({
      contact,
      startTime: new Date(),
      status: 'connecting',
    });

    // Simulate connection
    setTimeout(() => {
      setActiveCall((prev) => ({
        ...prev,
        status: 'connected',
      }));
    }, 2000);
  };

  const endCall = () => {
    if (callTimer) {
      clearInterval(callTimer);
      setCallTimer(null);
    }
    
    // Add this call to history
    if (activeCall && activeCall.status === 'connected') {
      // Code to add to call history would go here
    }
    
    setActiveCall(null);
    setCallDuration(0);
  };

  const filteredContacts = [
    ...emergencyContacts,
    ...securityOfficers,
  ].filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery) ||
    (contact.department || contact.position)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        height: 'calc(100vh - 100px)', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        px: 1,
        width: 1350,
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 1, 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            pl: 1,
          }}
        >
          <CallIcon sx={{ mr: 2, fontSize: '2.2rem', color: theme.palette.primary.main }} />
          Communications Center
        </Typography>

        <Paper sx={{ 
          flexGrow: 1, 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          borderRadius: 3,
          background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
        }}>
          <Grid container sx={{ height: '100%' }}>
            {/* Left Panel - Contacts */}
            <Grid item xs={12} md={4} sx={{ 
              borderRight: '1px solid rgba(0,0,0,0.08)', 
              height: '100%', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff'
            }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: 'background.paper',
              }}>
                <TextField
                  fullWidth
                  placeholder="Search contacts..."
                  variant="outlined"
                  size="medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.6rem' }} />
                      </InputAdornment>
                    ),
                    style: { 
                      fontSize: '1.25rem', 
                      padding: '12px 14px',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '12px',
                    }
                  }}
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                      '& fieldset': {
                        borderColor: 'rgba(0,0,0,0.08)',
                      },
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Button
                    variant={showCallHistory ? 'outlined' : 'contained'}
                    startIcon={<CallIcon sx={{ fontSize: '1.3rem' }} />}
                    onClick={() => setShowCallHistory(false)}
                    size="large"
                    sx={{ 
                      fontSize: '1.1rem', 
                      py: 1.2,
                      px: 3,
                      flex: 1,
                      mr: 1,
                      borderRadius: 2,
                      boxShadow: !showCallHistory ? '0 4px 10px rgba(0, 85, 165, 0.15)' : 'none',
                    }}
                  >
                    Contacts
                  </Button>
                  <Button 
                    sx={{
                      fontSize: '1.1rem', 
                      py: 1.2,
                      px: 3,
                      flex: 1,
                      ml: 1,
                      borderRadius: 2,
                      boxShadow: showCallHistory ? '0 4px 10px rgba(0, 85, 165, 0.15)' : 'none',
                    }}
                    variant={showCallHistory ? 'contained' : 'outlined'}
                    startIcon={<HistoryIcon sx={{ fontSize: '1.3rem' }} />}
                    onClick={() => setShowCallHistory(true)}
                    size="large"                
                  >
                    History
                  </Button>
                </Box>
              </Box>

              <Box sx={{ 
  overflow: 'auto', 
  flexGrow: 1,
  backgroundColor: 'rgba(248, 249, 250, 0.5)',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}}>
                {!showCallHistory ? (
                  <>
                    <Box sx={{ p: 2.5, bgcolor: 'rgba(244, 67, 54, 0.08)' }}>
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 600, 
                          display: 'flex', 
                          alignItems: 'center', 
                          fontSize: '1.3rem',
                          color: theme.palette.error.dark
                        }}
                      >
                        <StarIcon sx={{ fontSize: 24, mr: 1.5, color: theme.palette.error.main }} />
                        Emergency Contacts
                      </Typography>
                    </Box>
                    <List>
                      {emergencyContacts
                        .filter((contact) =>
                          searchQuery
                            ? contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              contact.number.includes(searchQuery)
                            : true
                        )
                        .map((contact) => (
                          <ListItem key={contact.id} sx={{ 
                            py: 2,
                            borderBottom: '1px solid rgba(0,0,0,0.03)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 85, 165, 0.05)',
                            },
                          }}>
                            <ListItemAvatar>
                              <Avatar 
                                src={contact.avatar} 
                                sx={{ 
                                  width: 60, 
                                  height: 60,
                                  border: '2px solid #fff',
                                }}
                              >
                                {contact.name.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
                                  {contact.name}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Typography variant="body1" component="div" sx={{ fontSize: '1.1rem', mt: 0.5 }}>
                                    {contact.number}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.8 }}>
                                    <Chip 
                                      label={contact.department} 
                                      size="small"
                                      color={
                                        contact.department === 'Security' ? 'primary' :
                                        contact.department === 'Medical' ? 'info' :
                                        contact.department === 'Fire' ? 'error' : 'default'
                                      }
                                      sx={{ 
                                        height: 24, 
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="span"
                                      color="text.secondary"
                                      sx={{ fontSize: '0.95rem', ml: 1 }}
                                    >
                                      {contact.description}
                                    </Typography>
                                  </Box>
                                </>
                              }
                              sx={{ ml: 2 }}
                            />
                            <IconButton
                              color="error"
                              sx={{ 
                                backgroundColor: 'rgba(244, 67, 54, 0.08)', 
                                width: 48, 
                                height: 48,
                                '&:hover': {
                                  backgroundColor: 'rgba(244, 67, 54, 0.15)',
                                }
                              }}
                              onClick={() => startCall(contact)}
                            >
                              <PhoneIcon sx={{ fontSize: '1.5rem' }} />
                            </IconButton>
                          </ListItem>
                        ))}
                    </List>

                    <Box sx={{ p: 2.5, bgcolor: 'rgba(0, 85, 165, 0.08)' }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: '1.3rem',
                          display: 'flex',
                          alignItems: 'center',
                          color: theme.palette.primary.dark
                        }}
                      >
                        <SecurityIcon sx={{ fontSize: 24, mr: 1.5, color: theme.palette.primary.main }} />
                        Security Officers
                      </Typography>
                    </Box>
                    <List>
                      {securityOfficers
                        .filter((officer) =>
                          searchQuery
                            ? officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              officer.number.includes(searchQuery)
                            : true
                        )
                        .map((officer) => (
                          <ListItem key={officer.id} sx={{ 
                            py: 2,
                            borderBottom: '1px solid rgba(0,0,0,0.03)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 85, 165, 0.05)',
                            },
                          }}>
                            <ListItemAvatar>
                              <StatusBadge status={officer.status}>
                                <Avatar 
                                  src={officer.avatar} 
                                  sx={{ 
                                    width: 60, 
                                    height: 60,
                                    border: '2px solid #fff',
                                  }}
                                >
                                  {officer.name.charAt(0)}
                                </Avatar>
                              </StatusBadge>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
                                  {officer.name}
                                </Typography>
                              }
                              secondary={
                                <>
                                  <Typography variant="body1" component="div" sx={{ fontSize: '1.1rem', mt: 0.5 }}>
                                    {officer.number}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.8 }}>
                                    <Chip 
                                      label={officer.status} 
                                      size="small"
                                      color={
                                        officer.status === 'available' ? 'success' :
                                        officer.status === 'on call' ? 'primary' : 'default'
                                      }
                                      sx={{ 
                                        height: 24, 
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                      }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="span"
                                      color="text.secondary"
                                      sx={{ fontSize: '0.95rem', ml: 1 }}
                                    >
                                      {officer.position}
                                    </Typography>
                                  </Box>
                                </>
                              }
                              sx={{ ml: 2 }}
                            />
                            <IconButton
                              color="primary"
                              sx={{ 
                                backgroundColor: 'rgba(0, 85, 165, 0.08)', 
                                width: 48, 
                                height: 48,
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 85, 165, 0.15)',
                                }
                              }}
                              onClick={() => startCall(officer)}
                              disabled={officer.status === 'off duty'}
                            >
                              <PhoneIcon sx={{ fontSize: '1.5rem' }} />
                            </IconButton>
                          </ListItem>
                        ))}
                    </List>
                  </>
                ) : (
                  <>
                    <Box sx={{ p: 2.5, bgcolor: 'rgba(0,0,0,0.03)' }}>
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 600, 
                          display: 'flex', 
                          alignItems: 'center', 
                          fontSize: '1.3rem'
                        }}
                      >
                        <HistoryIcon sx={{ fontSize: 24, mr: 1.5, color: theme.palette.text.secondary }} />
                        Recent Calls
                      </Typography>
                    </Box>
                    {callHistory.map((call, index) => (
                      <Box key={call.id}>
                        {index === 0 || formatDate(call.time) !== formatDate(callHistory[index-1].time) ? (
                          <Box sx={{ 
                            px: 2.5, 
                            py: 1.5, 
                            bgcolor: 'rgba(0,0,0,0.02)',
                            borderTop: index !== 0 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                            borderBottom: '1px solid rgba(0,0,0,0.05)',
                          }}>
                            <Typography variant="subtitle2" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                              {formatDate(call.time)}
                            </Typography>
                          </Box>
                        ) : null}
                        <ListItem sx={{ 
                          py: 2,
                          borderBottom: '1px solid rgba(0,0,0,0.03)',
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          },
                        }}>
                          <ListItemAvatar>
                            <Avatar 
                              src={call.avatar} 
                              sx={{ 
                                width: 60, 
                                height: 60,
                                border: '2px solid #fff',
                              }}
                            >
                              {call.name.charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 600 }}>{call.name}</Typography>
                                <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>
                                  {formatTime(call.time)}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.8 }}>
                                  <Chip 
                                    label={call.department} 
                                    size="small"
                                    color={
                                      call.department === 'Security' ? 'primary' :
                                      call.department === 'Medical' ? 'info' :
                                      call.department === 'Fire' ? 'error' : 'default'
                                    }
                                    sx={{ 
                                      height: 24, 
                                      fontSize: '0.85rem',
                                      fontWeight: 500,
                                      mr: 1,
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    component="span"
                                    color="text.secondary"
                                    sx={{ fontSize: '1rem' }}
                                  >
                                    {call.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                                  </Typography>
                                  <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '16px' }} />
                                  <Typography
                                    variant="body2"
                                    component="span"
                                    color="text.secondary"
                                    sx={{ fontSize: '1rem' }}
                                  >
                                    {call.duration}
                                  </Typography>
                                </Box>
                                <Typography variant="body1" component="div" sx={{ fontSize: '1.1rem', mt: 0.5 }}>
                                  {call.number}
                                </Typography>
                              </>
                            }
                            sx={{ ml: 2 }}
                          />
                          <IconButton
                            color={call.department === 'Security' ? 'primary' : 
                                   call.department === 'Fire' || call.department === 'Medical' ? 'error' : 'primary'}
                            sx={{ 
                              backgroundColor: call.department === 'Security' ? 'rgba(0, 85, 165, 0.08)' : 
                                             call.department === 'Fire' || call.department === 'Medical' ? 'rgba(244, 67, 54, 0.08)' : 'rgba(0, 85, 165, 0.08)', 
                              width: 48, 
                              height: 48,
                              '&:hover': {
                                backgroundColor: call.department === 'Security' ? 'rgba(0, 85, 165, 0.15)' : 
                                               call.department === 'Fire' || call.department === 'Medical' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(0, 85, 165, 0.15)',
                              }
                            }}
                            onClick={() =>
                              startCall({
                                name: call.name,
                               number: call.number,
                                avatar: call.avatar,
                                department: call.department,
                              })
                            }
                          >
                            <PhoneIcon sx={{ fontSize: '1.5rem' }} />
                          </IconButton>
                        </ListItem>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </Grid>

            {/* Right Panel - Call Interface */}
            <Grid item xs={12} md={8} sx={{ height: '100%', overflow: 'hidden' }}>
              {activeCall ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    p: 5,
                    background: 'linear-gradient(to bottom, #f8faff, #f0f4fa)',
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={activeCall.contact.avatar}
                      sx={{ 
                        width: 180, 
                        height: 180, 
                        mb: 3,
                        border: '4px solid white',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                      }}
                    >
                      {activeCall.contact.name.charAt(0)}
                    </Avatar>
                    
                    {activeCall.status === 'connected' && (
                      <Chip
                        label="Connected"
                        color="success"
                        sx={{ 
                          position: 'absolute',
                          bottom: 30,
                          right: -10,
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    )}
                    
                    {activeCall.status === 'connecting' && (
                      <Chip
                        label="Connecting..."
                        color="warning"
                        sx={{ 
                          position: 'absolute',
                          bottom: 30,
                          right: -10,
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    )}
                  </Box>
                  
                  <Typography variant="h4" sx={{ mb: 1, fontSize: '2.2rem', fontWeight: 'bold' }}>
                    {activeCall.contact.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={activeCall.contact.department} 
                      color={
                        activeCall.contact.department === 'Security' ? 'primary' :
                        activeCall.contact.department === 'Medical' ? 'info' :
                        activeCall.contact.department === 'Fire' ? 'error' : 
                        'default'
                      }
                      sx={{ 
                        mr: 1.5, 
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    />
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: '1.6rem' }}>
                      {activeCall.contact.number}
                    </Typography>
                  </Box>
                  
                  {activeCall.status === 'connected' && (
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 5, 
                        fontSize: '2.2rem',
                        fontWeight: 'medium',
                        fontFamily: 'monospace',
                        letterSpacing: '2px' 
                      }}
                    >
                      {formatCallDuration(callDuration)}
                    </Typography>
                  )}
                  
                  {activeCall.status === 'connecting' && (
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 5, 
                        fontSize: '1.4rem',
                        fontStyle: 'italic'
                      }}
                    >
                      Establishing secure connection...
                    </Typography>
                  )}

                  {/* Call Controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 3,
                      flexWrap: 'wrap',
                      mb: 5
                    }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(0,0,0,0.05)',
                        width: 80,
                        height: 80,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <MicOffIcon sx={{ fontSize: '2.2rem', color: 'text.primary' }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(0,0,0,0.05)',
                        width: 80,
                        height: 80,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <VolumeUpIcon sx={{ fontSize: '2.2rem', color: 'text.primary' }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(0, 85, 165, 0.08)',
                        width: 80,
                        height: 80,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0, 85, 165, 0.15)',
                        }
                      }}
                    >
                      <VideocamIcon sx={{ fontSize: '2.2rem', color: theme.palette.primary.main }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(0, 85, 165, 0.08)',
                        width: 80,
                        height: 80,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0, 85, 165, 0.15)',
                        }
                      }}
                    >
                      <ChatIcon sx={{ fontSize: '2.2rem', color: theme.palette.primary.main }} />
                    </IconButton>
                    <IconButton
                      sx={{
                        bgcolor: 'rgba(0,0,0,0.05)',
                        width: 80,
                        height: 80,
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <AddIcCallIcon sx={{ fontSize: '2.2rem', color: 'text.primary' }} />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CallEndIcon sx={{ fontSize: '2rem' }} />}
                    onClick={endCall}
                    sx={{ 
                      px: 5, 
                      py: 2, 
                      borderRadius: 28, 
                      fontSize: '1.4rem',
                      boxShadow: '0 4px 14px rgba(244, 67, 54, 0.4)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(244, 67, 54, 0.6)',
                      }
                    }}
                  >
                    End Call
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    p: 5,
                    background: 'linear-gradient(to bottom, #f8faff, #f0f4fa)',
                    overflow: 'hidden',
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/subtle-white-feathers.png")',
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/344/phone.png"
                    alt="Call Center"
                    style={{ width: 200, height: 200, marginBottom: 40 }}
                  />
                  <Typography variant="h5" sx={{ 
                    mb: 2, 
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: theme.palette.primary.dark
                  }}>
                    Campus Emergency Communication
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 5, maxWidth: 600, fontSize: '1.3rem', lineHeight: 1.6 }}
                  >
                    Connect directly with campus security, medical services, or emergency personnel.
                    Select a contact from the list to initiate a call.
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: 3,
                    mb: 4,
                    flexWrap: 'wrap'
                  }}>
                    <Paper elevation={3} sx={{ 
                      p: 3, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 3,
                      width: 180,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                      }
                    }}>
                      <SecurityIcon sx={{ 
                        fontSize: '3.5rem', 
                        color: theme.palette.primary.main,
                        mb: 2
                      }} />
                      <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                        Security
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Campus patrol and emergency response
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={3} sx={{ 
                      p: 3, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 3,
                      width: 180,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                      }
                    }}>
                      <LocalHospitalIcon sx={{ 
                        fontSize: '3.5rem', 
                        color: '#2196f3',
                        mb: 2
                      }} />
                      <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                        Medical
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Health center and emergency medical services
                      </Typography>
                    </Paper>
                    
                    <Paper elevation={3} sx={{ 
                      p: 3, 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: 3,
                      width: 180,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                      }
                    }}>
                      <LocalFireDepartmentIcon sx={{ 
                        fontSize: '3.5rem', 
                        color: theme.palette.error.main,
                        mb: 2
                      }} />
                      <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                        Fire & Safety
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Fire emergency and evacuation assistance
                      </Typography>
                    </Paper>
                  </Box>
                  
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StarIcon sx={{ fontSize: '1.5rem' }} />}
                    onClick={() => setEmergencyContactsOpen(true)}
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      fontSize: '1.3rem',
                      borderRadius: 2,
                      boxShadow: '0 4px 14px rgba(244, 67, 54, 0.4)',
                      '&:hover': {
                        boxShadow: '0 6px 20px rgba(244, 67, 54, 0.6)',
                      }
                    }}
                  >
                    Emergency Contacts
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Emergency Contacts Dialog */}
        <Dialog
          open={emergencyContactsOpen}
          onClose={() => setEmergencyContactsOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ 
            fontSize: '1.8rem', 
            py: 3,
            px: 4,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <StarIcon sx={{ color: theme.palette.error.main, mr: 2, fontSize: '2rem' }} />
            Emergency Contacts
          </DialogTitle>
          <DialogContent sx={{ 
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '4px',
            },
            scrollbarWidth: 'thin',
            py: 3,
            px: 4
          }}>
            <Typography color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              These numbers are available 24/7 for campus emergencies. Tap on Call to immediately connect with emergency services.
            </Typography>
            <List>
              {emergencyContacts.map((contact) => (
                <ListItem key={contact.id} sx={{ 
                  py: 2.5,
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <ListItemAvatar>
                    <Avatar 
                      src={contact.avatar} 
                      sx={{ 
                        bgcolor: contact.department === 'Security' ? theme.palette.primary.main : 
                               contact.department === 'Medical' ? '#2196f3' : 
                               contact.department === 'Fire' ? theme.palette.error.main : '#607d8b', 
                        width: 70, 
                        height: 70
                      }}
                    >
                      {contact.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '1.5rem', fontWeight: 'medium' }}>{contact.name}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body1" component="div" sx={{ fontSize: '1.3rem', fontWeight: 'bold', my: 0.8 }}>
                          {contact.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          color="text.secondary"
                          sx={{ fontSize: '1.1rem' }}
                        >
                          {contact.description}
                        </Typography>
                      </>
                    }
                    sx={{ ml: 3 }}
                  />
                  <Button
                    variant="contained"
                    color={
                      contact.department === 'Security' ? 'primary' : 
                      contact.department === 'Medical' ? 'info' : 
                      contact.department === 'Fire' ? 'error' : 'default'
                    }
                    startIcon={<PhoneIcon sx={{ fontSize: '1.3rem' }} />}
                    onClick={() => {
                      startCall(contact);
                      setEmergencyContactsOpen(false);
                    }}
                    size="large"
                    sx={{ 
                      fontSize: '1.1rem', 
                      px: 3, 
                      py: 1.2,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Call
                  </Button>
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions sx={{ px: 4, py: 3, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <Button 
              onClick={() => setEmergencyContactsOpen(false)} 
              size="large" 
              variant="outlined"
              sx={{ fontSize: '1.1rem', px: 3, py: 1.2 }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

// Custom status badge for officer availability
function StatusBadge({ status, children }) {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: 
            status === 'available' ? '#4caf50' : 
            status === 'on call' ? '#ff9800' : '#bdbdbd',
          border: '3px solid white',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
        }}
      />
    </Box>
  );
}

export default CallingSystem;