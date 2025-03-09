import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
  RadioGroup
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PersonIcon from '@mui/icons-material/Person';
import { format, formatDistance } from 'date-fns';

function SOSReports() {
  const [sosAlerts, setSOSAlerts] = useState([
    {
      id: 'sos-001',
      userId: 'user-123',
      userName: 'John Smith',
      userPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      location: {
        lat: 6.8937,
        lng: 3.7182,
        description: 'Near Main Library'
      },
      status: 'active',
      responded: false,
      respondingOfficer: null
    },
    {
      id: 'sos-002',
      userId: 'user-456',
      userName: 'Sarah Johnson',
      userPhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
      timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 minutes ago
      location: {
        lat: 6.8917,
        lng: 3.7152, 
        description: 'Female Hostel C'
      },
      status: 'active',
      responded: true,
      respondingOfficer: {
        id: 'officer-002',
        name: 'Officer Williams',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg',
        badge: 'B-445'
      }
    },
    {
      id: 'sos-003',
      userId: 'user-789',
      userName: 'Anonymous User',
      userPhoto: null,
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 minutes ago
      location: {
        lat: 6.8947,
        lng: 3.7162,
        description: 'Science Building'
      },
      status: 'resolved',
      responded: true,
      respondingOfficer: {
        id: 'officer-001',
        name: 'Officer Johnson',
        photo: 'https://randomuser.me/api/portraits/men/55.jpg',
        badge: 'B-223'
      }
    }
  ]);

  // Available officers data
  const [availableOfficers, setAvailableOfficers] = useState([
    {
      id: 'officer-001',
      name: 'Officer Johnson',
      photo: 'https://randomuser.me/api/portraits/men/55.jpg',
      badge: 'B-223',
      status: 'available',
      lastLocation: 'Main Gate'
    },
    {
      id: 'officer-002',
      name: 'Officer Williams',
      photo: 'https://randomuser.me/api/portraits/men/75.jpg',
      badge: 'B-445',
      status: 'available',
      lastLocation: 'Admin Block'
    },
    {
      id: 'officer-003',
      name: 'Officer Thompson',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      badge: 'B-332',
      status: 'available',
      lastLocation: 'Science Complex'
    },
    {
      id: 'officer-004',
      name: 'Officer Martinez',
      photo: 'https://randomuser.me/api/portraits/men/42.jpg',
      badge: 'B-118',
      status: 'available',
      lastLocation: 'Student Center'
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [officersDialogOpen, setOfficersDialogOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [newSOSCount, setNewSOSCount] = useState(1);

  useEffect(() => {
    // Simulate a new incoming SOS alert after 10 seconds
    const timeoutId = setTimeout(() => {
      const newAlert = {
        id: `sos-00${sosAlerts.length + 1}`,
        userId: 'user-999',
        userName: 'Michael Brown',
        userPhoto: 'https://randomuser.me/api/portraits/men/41.jpg',
        timestamp: new Date().toISOString(),
        location: {
          lat: 6.8957,
          lng: 3.7142,
          description: 'Campus Gym'
        },
        status: 'active',
        responded: false,
        respondingOfficer: null
      };
      
      setSOSAlerts(prev => [newAlert, ...prev]);
      setNewSOSCount(prev => prev + 1);
      
      // Play alert sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3');
      audio.play();
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const handleViewMap = (alert) => {
    setSelectedAlert(alert);
    setMapDialogOpen(true);
  };

  const handleCloseMap = () => {
    setMapDialogOpen(false);
  };

  // Show the officer selection dialog
  const handleOpenOfficersDialog = (alert) => {
    setSelectedAlert(alert);
    setSelectedOfficer(null);
    setOfficersDialogOpen(true);
  };

  const handleCloseOfficersDialog = () => {
    setOfficersDialogOpen(false);
  };

  const handleSelectOfficer = (officer) => {
    setSelectedOfficer(officer);
  };

  // Dispatch the selected officer to the emergency
  const handleDispatchOfficer = () => {
    if (!selectedOfficer || !selectedAlert) return;
    
    setSOSAlerts(alerts => 
      alerts.map(alert => 
        alert.id === selectedAlert.id 
          ? { ...alert, responded: true, respondingOfficer: selectedOfficer } 
          : alert
      )
    );
    
    // Update officer status to busy/responding
    setAvailableOfficers(officers =>
      officers.map(officer =>
        officer.id === selectedOfficer.id
          ? { ...officer, status: 'responding' }
          : officer
      )
    );
    
    setOfficersDialogOpen(false);
  };

  const handleResolve = (alertId) => {
    // Get the alert to find the responding officer
    const alert = sosAlerts.find(a => a.id === alertId);
    const officerId = alert?.respondingOfficer?.id;
    
    // Update the alert status
    setSOSAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' } 
          : alert
      )
    );
    
    // If there was a responding officer, set them back to available
    if (officerId) {
      setAvailableOfficers(officers =>
        officers.map(officer =>
          officer.id === officerId
            ? { ...officer, status: 'available' }
            : officer
        )
      );
    }
  };

  const getRelativeTime = (timestamp) => {
    return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
  };
  
  const activeAlerts = sosAlerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = sosAlerts.filter(alert => alert.status === 'resolved');

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, width:1300 }}>
        <Typography variant="h4" component="h1">
          SOS Emergency Reports
        </Typography>
        <Badge badgeContent={newSOSCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 14, height: 22, minWidth: 22 } }}>
          <Chip 
            icon={<NotificationsActiveIcon />} 
            label="Live Monitoring" 
            color="primary" 
            sx={{ pl: 1 }}
          />
        </Badge>
      </Box>
      
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
      >
        SOS alerts are triggered when users hold the emergency button for 3 seconds in the app. These are high-priority alerts requiring immediate attention.
      </Alert>

      <Typography variant="h6" gutterBottom sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Box 
          component="span" 
          sx={{ 
            display: 'inline-block', 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            bgcolor: 'error.main', 
            mr: 1,
            animation: 'pulse 2s infinite'
          }} 
        />
        Active Emergencies ({activeAlerts.length})
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {activeAlerts.length > 0 ? (
          activeAlerts.map((alert) => (
            <Grid item xs={12} md={6} lg={4} key={alert.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  position: 'relative',
                  borderLeft: '4px solid',
                  borderLeftColor: alert.responded ? 'warning.main' : 'error.main',
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  {alert.responded ? (
                    <Chip 
                      size="small" 
                      label="Officers Responding" 
                      color="warning"
                    />
                  ) : (
                    <Chip 
                      size="small" 
                      label="Needs Response" 
                      color="error" 
                      sx={{ animation: 'pulse 1.5s infinite' }}
                    />
                  )}
                </Box>
                <CardContent sx={{ pt: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={alert.userPhoto} 
                      sx={{ mr: 2, width: 56, height: 56 }}
                    >
                      {alert.userName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                        {alert.userName}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary" 
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                        {getRelativeTime(alert.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      bgcolor: 'background.default', 
                      p: 1.5, 
                      borderRadius: 1,
                      mb: 2 
                    }}
                  >
                    <LocationOnIcon color="error" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {alert.location.description}
                    </Typography>
                  </Box>
                  
                  {/* Show responding officer if there is one */}
                  {alert.responded && alert.respondingOfficer && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 1.5,
                        borderRadius: 1,
                        mb: 2,
                        bgcolor: 'warning.light'
                      }}
                    >
                      <Avatar 
                        src={alert.respondingOfficer.photo} 
                        sx={{ mr: 1, width: 32, height: 32 }}
                      >
                        {alert.respondingOfficer.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {alert.respondingOfficer.name}
                        </Typography>
                        <Typography variant="caption">
                          Badge: {alert.respondingOfficer.badge}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="outlined" 
                      startIcon={<MyLocationIcon />}
                      onClick={() => handleViewMap(alert)}
                    >
                      View Map
                    </Button>
                    
                    {!alert.responded ? (
                      <Button 
                        variant="contained" 
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={() => handleOpenOfficersDialog(alert)}
                      >
                        Dispatch Help
                      </Button>
                    ) : (
                      <Button 
                        variant="contained" 
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => handleResolve(alert.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="success">
              No active emergencies at this time.
            </Alert>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Resolved Emergencies ({resolvedAlerts.length})
      </Typography>
      
      <Grid container spacing={2}>
        {resolvedAlerts.map((alert) => (
          <Grid item xs={12} md={6} lg={4} key={alert.id}>
            <Card 
              sx={{ 
                borderLeft: '4px solid',
                borderLeftColor: 'success.main',
                opacity: 0.8
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={alert.userPhoto} 
                    sx={{ mr: 2 }}
                  >
                    {alert.userName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">
                      {alert.userName}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                      {getRelativeTime(alert.timestamp)}
                    </Typography>
                  </Box>
                  <Chip 
                    size="small" 
                    label="Resolved" 
                    color="success"
                    sx={{ ml: 'auto' }}
                  />
                </Box>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    bgcolor: 'background.default', 
                    p: 1, 
                    borderRadius: 1 
                  }}
                >
                  <LocationOnIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {alert.location.description}
                  </Typography>
                </Box>
                
                {/* Show resolved by officer info */}
                {alert.respondingOfficer && (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mt: 1,
                      p: 1,
                      borderRadius: 1
                    }}
                  >
                    <PersonIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      Resolved by {alert.respondingOfficer.name}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    startIcon={<MyLocationIcon />}
                    onClick={() => handleViewMap(alert)}
                  >
                    View Map
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Map Dialog */}
      <Dialog
        open={mapDialogOpen}
        onClose={handleCloseMap}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Emergency Location
          {selectedAlert && (
            <Typography variant="subtitle2" color="text.secondary">
              {selectedAlert.userName} • {selectedAlert.location.description}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent dividers>
          {selectedAlert && (
            <Box sx={{ position: 'relative', height: 400 }}>
              {/* This is a placeholder for a real map */}
              <Box
                component="iframe"
                src={`https://maps.google.com/maps?q=${selectedAlert.location.lat},${selectedAlert.location.lng}&z=17&output=embed`}
                sx={{ border: 0, height: '100%', width: '100%' }}
                title="Emergency Location"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMap}>Close</Button>
          {selectedAlert && selectedAlert.status === 'active' && (
            <>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PhoneIcon />}
                onClick={handleCloseMap}
              >
                Call User
              </Button>
              {!selectedAlert.responded ? (
                <Button 
                  variant="contained" 
                  color="error"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    handleOpenOfficersDialog(selectedAlert);
                    handleCloseMap();
                  }}
                >
                  Dispatch Emergency Response
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => {
                    handleResolve(selectedAlert.id);
                    handleCloseMap();
                  }}
                >
                  Mark Resolved
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Officer Selection Dialog */}
      <Dialog
        open={officersDialogOpen}
        onClose={handleCloseOfficersDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Select Available Officer
          {selectedAlert && (
            <Typography variant="subtitle2" color="text.secondary">
              Emergency at {selectedAlert.location.description}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {availableOfficers.filter(officer => officer.status === 'available').length > 0 ? (
              availableOfficers
                .filter(officer => officer.status === 'available')
                .map((officer) => (
                  <ListItem 
                    key={officer.id}
                    button
                    onClick={() => handleSelectOfficer(officer)}
                    selected={selectedOfficer?.id === officer.id}
                    sx={{
                      mb: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                        }
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={officer.photo}>
                        {officer.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={officer.name} 
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            Badge: {officer.badge}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              Last seen: {officer.lastLocation}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Radio 
                        checked={selectedOfficer?.id === officer.id}
                        onChange={() => handleSelectOfficer(officer)}
                        value={officer.id}
                        name="officer-radio-button"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
            ) : (
              <Alert severity="warning" sx={{ mb: 2 }}>
                No officers are currently available. Please check back soon or contact the security office.
              </Alert>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOfficersDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleDispatchOfficer}
            disabled={!selectedOfficer}
            endIcon={<SendIcon />}
          >
            Dispatch Officer
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* CSS for pulsing effect */}
      <style jsx="true">{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}

export default SOSReports;