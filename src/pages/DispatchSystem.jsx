import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Badge,
  Divider,
  Alert,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import GroupIcon from '@mui/icons-material/Group';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns';

// Custom theme to increase typography sizes
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontSize: '1.8rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.4rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.1rem',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.95rem',
    },
    caption: {
      fontSize: '0.85rem',
    },
    button: {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.8rem',
          height: '28px',
        },
        sizeSmall: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function DispatchSystem() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: 'Theft',
      description: 'Laptop stolen from University library',
      location: 'Main Library, 2nd Floor',
      coordinates: { lat: 6.8937, lng: 3.7182 },
      status: 'pending',
      priority: 'high',
      reportedBy: {
        name: 'John Smith',
        matricNumber: 'BU/21/CS/0123',
        phoneNumber: '08012345678',
        course: 'Computer Science',
        department: 'Science and Technology'
      },
      isAnonymous: false,
      hasImage: true,
      imagePath: '/incidents/theft.jpg',
      reportedAt: '2025-03-05T09:30:00Z',
      assignedOfficers: [],
    },
    {
      id: 2,
      type: 'Harassment',
      description: 'Verbal harassment near female dormitory',
      location: 'Female Hostel C, Entrance',
      coordinates: { lat: 6.8917, lng: 3.7152 },
      status: 'in-progress',
      priority: 'high',
      reportedBy: {
        name: 'Anonymous',
      },
      isAnonymous: true,
      hasImage: false,
      reportedAt: '2025-03-05T08:45:00Z',
      assignedOfficers: [
        {
          id: 101,
          name: 'Officer James',
          status: 'en-route',
          estimatedArrival: '5 mins',
        },
      ],
    },
    {
      id: 3,
      type: 'Medical',
      description: 'Student fainted in classroom',
      location: 'Science Building, Room 201',
      coordinates: { lat: 6.8947, lng: 3.7162 },
      status: 'in-progress',
      priority: 'medium',
      reportedBy: {
        name: 'Sarah Johnson',
        matricNumber: 'BU/22/BIO/0567',
        phoneNumber: '08098765432',
        course: 'Biology',
        department: 'Science and Technology'
      },
      isAnonymous: false,
      hasImage: true,
      imagePath: '/incidents/medical.jpg',
      reportedAt: '2025-03-05T10:15:00Z',
      assignedOfficers: [
        {
          id: 102,
          name: 'Medical Team A',
          status: 'on-site',
          estimatedArrival: null,
        },
      ],
    },
  ]);

  const [officers, setOfficers] = useState([
    {
      id: 101,
      name: 'Officer James',
      badge: 'B-1204',
      status: 'assigned',
      location: 'En route to Female Hostel C',
      avatar: '/avatars/officer1.jpg',
    },
    {
      id: 102,
      name: 'Medical Team A',
      badge: 'M-225',
      status: 'assigned',
      location: 'Science Building',
      avatar: '/avatars/medical-team.jpg',
    },
    {
      id: 103,
      name: 'Officer Sarah',
      badge: 'B-1508',
      status: 'available',
      location: 'Patrol - East Campus',
      avatar: '/avatars/officer2.jpg',
    },
    {
      id: 104,
      name: 'Officer Michael',
      badge: 'B-1356',
      status: 'available',
      location: 'Security Office',
      avatar: '/avatars/officer3.jpg',
    },
    {
      id: 105,
      name: 'Officer Lisa',
      badge: 'B-1782',
      status: 'off-duty',
      location: 'Off Campus',
      avatar: '/avatars/officer4.jpg',
    },
  ]);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);
  const [incidentDetailsOpen, setIncidentDetailsOpen] = useState(false);
  const [selectedOfficers, setSelectedOfficers] = useState([]);
  const [dispatchNote, setDispatchNote] = useState('');
  const [successAlert, setSuccessAlert] = useState(null);

  const handleDispatchOpen = (incident) => {
    setSelectedIncident(incident);
    setDispatchDialogOpen(true);
    setSelectedOfficers([]);
    setDispatchNote('');
  };

  const handleDispatchClose = () => {
    setDispatchDialogOpen(false);
  };

  const handleIncidentDetailsOpen = (incident) => {
    setSelectedIncident(incident);
    setIncidentDetailsOpen(true);
  };

  const handleIncidentDetailsClose = () => {
    setIncidentDetailsOpen(false);
  };

  const handleOfficerSelect = (e) => {
    setSelectedOfficers(e.target.value);
  };

  const handleDispatchSubmit = () => {
    const updatedIncidents = incidents.map((incident) => {
      if (incident.id === selectedIncident.id) {
        // Map selected officer IDs to officer objects
        const newAssignedOfficers = selectedOfficers.map((officerId) => {
          const officer = officers.find((o) => o.id === officerId);
          return {
            id: officer.id,
            name: officer.name,
            status: 'en-route',
            estimatedArrival: '10 mins',
          };
        });

        return {
          ...incident,
          status: 'in-progress',
          assignedOfficers: [...incident.assignedOfficers, ...newAssignedOfficers],
        };
      }
      return incident;
    });

    // Update officers status
    const updatedOfficers = officers.map((officer) => {
      if (selectedOfficers.includes(officer.id)) {
        return {
          ...officer,
          status: 'assigned',
          location: `En route to ${selectedIncident.location}`,
        };
      }
      return officer;
    });

    setIncidents(updatedIncidents);
    setOfficers(updatedOfficers);
    setDispatchDialogOpen(false);
    
    // Show success alert
    setSuccessAlert({
      message: `Dispatched ${selectedOfficers.length} officer(s) to ${selectedIncident.location}`,
      officerNames: selectedOfficers.map(id => officers.find(o => o.id === id).name).join(', ')
    });
    
    setTimeout(() => {
      setSuccessAlert(null);
    }, 5000);
  };

  // Filter officers that are available for dispatch
  const availableOfficers = officers.filter(
    (officer) => officer.status === 'available'
  );

  const getPriorityChip = (priority) => {
    const priorityColors = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    };

    return (
      <Chip
        size="small"
        label={priority.toUpperCase()}
        color={priorityColors[priority]}
        sx={{ fontWeight: 'bold', px: 1 }}
      />
    );
  };

  const getStatusChip = (status) => {
    const statusColors = {
      pending: 'warning',
      'in-progress': 'info',
      resolved: 'success',
    };

    return (
      <Chip
        size="small"
        label={status.replace('-', ' ').toUpperCase()}
        color={statusColors[status]}
        sx={{ fontWeight: 'bold', px: 1 }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Dispatch System
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={() => {/* Refresh data */}}
            size="large"
          >
            Refresh
          </Button>
        </Box>

        {successAlert && (
          <Alert 
            severity="success" 
            sx={{ mb: 3, py: 1.5, fontSize: '1rem' }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="medium"
                onClick={() => setSuccessAlert(null)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {successAlert.message}
              {successAlert.officerNames && (
                <Typography variant="body2" component="div" sx={{ mt: 0.5 }}>
                  Officers: {successAlert.officerNames}
                </Typography>
              )}
            </Typography>
          </Alert>
        )}

        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          {/* Left Panel - Incidents */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid #ddd', bgcolor: 'background.default' }}>
                <Typography variant="h6">Active Incidents</Typography>
              </Box>
              
              <Box sx={{ overflow: 'auto', p: 2.5, flexGrow: 1 }}>
                <Grid container spacing={3}>
                  {incidents.map((incident) => (
                    <Grid item xs={12} key={incident.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          borderLeft: '6px solid',
                          borderLeftColor: 
                            incident.priority === 'high' 
                              ? '#f44336' 
                              : incident.priority === 'medium' 
                              ? '#ff9800' 
                              : '#4caf50',
                          p: 1,
                          boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
                        }}
                      >
                        <CardContent sx={{ pb: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="h6" component="div">
                              {incident.type}
                            </Typography>
                            <Box>
                              {getPriorityChip(incident.priority)}
                              {' '}
                              {getStatusChip(incident.status)}
                            </Box>
                          </Box>
                          
                          <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mt: 1.5, fontSize: '1.1rem' }}>
                            <LocationOnIcon sx={{ mr: 0.8, fontSize: '1.3rem' }} />
                            {incident.location}
                          </Typography>
                          
                          <Typography variant="body1" sx={{ mt: 1.5, fontSize: '1rem' }}>
                            {incident.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
                            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                              <PersonIcon sx={{ mr: 0.8, fontSize: '1.2rem' }} />
                              {incident.isAnonymous ? 'Anonymous' : incident.reportedBy.name}
                            </Typography>
                            
                            <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                              <AccessTimeIcon sx={{ mr: 0.8, fontSize: '1.2rem' }} />
                              {format(new Date(incident.reportedAt), 'MMM d, h:mm a')}
                            </Typography>
                            
                            {incident.assignedOfficers.length > 0 && (
                              <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                                <GroupIcon sx={{ mr: 0.8, fontSize: '1.2rem' }} />
                                {incident.assignedOfficers.length} officer(s) assigned
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                        
                        <CardActions sx={{ px: 2, py: 1.5 }}>
                          <Button 
                            size="medium" 
                            onClick={() => handleIncidentDetailsOpen(incident)}
                            sx={{ fontSize: '0.95rem' }}
                          >
                            View Details
                          </Button>
                          
                          {incident.status !== 'resolved' && (
                            <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              endIcon={<SendIcon />}
                              onClick={() => handleDispatchOpen(incident)}
                              disabled={availableOfficers.length === 0}
                              sx={{ fontSize: '0.95rem', ml: 1 }}
                            >
                              Dispatch
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Right Panel - Officers */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Box sx={{ p: 2.5, borderBottom: '1px solid #ddd', bgcolor: 'background.default' }}>
                <Typography variant="h6">Officers Status</Typography>
              </Box>
              
              <List sx={{ overflow: 'auto', flexGrow: 1, py: 0 }}>
                <ListItem sx={{ bgcolor: 'rgba(76, 175, 80, 0.12)', py: 1.5 }}>
                  <ListItemText 
                    primary="Available" 
                    primaryTypographyProps={{ variant: 'subtitle2', fontSize: '1.1rem' }}
                  />
                </ListItem>
                
                {officers
                  .filter(officer => officer.status === 'available')
                  .map(officer => (
                    <ListItem key={officer.id} sx={{ py: 1.5 }}>
                      <ListItemAvatar>
                        <Badge
                          color="success"
                          variant="dot"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          overlap="circular"
                          sx={{ '& .MuiBadge-badge': { height: 12, width: 12, borderRadius: 6 } }}
                        >
                          <Avatar src={officer.avatar} sx={{ width: 48, height: 48 }}>{officer.name.charAt(0)}</Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={officer.name}
                        primaryTypographyProps={{ fontSize: '1.05rem', fontWeight: 500 }}
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ fontSize: '0.9rem' }}>
                              {officer.badge}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              color="text.secondary"
                              sx={{ fontSize: '0.9rem', mt: 0.5 }}
                            >
                              {officer.location}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                
                <ListItem sx={{ bgcolor: 'rgba(33, 150, 243, 0.12)', py: 1.5 }}>
                  <ListItemText 
                    primary="On Duty" 
                    primaryTypographyProps={{ variant: 'subtitle2', fontSize: '1.1rem' }}
                  />
                </ListItem>
                
                {officers
                  .filter(officer => officer.status === 'assigned')
                  .map(officer => (
                    <ListItem key={officer.id} sx={{ py: 1.5 }}>
                      <ListItemAvatar>
                        <Badge
                          color="info"
                          variant="dot"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          overlap="circular"
                          sx={{ '& .MuiBadge-badge': { height: 12, width: 12, borderRadius: 6 } }}
                        >
                          <Avatar src={officer.avatar} sx={{ width: 48, height: 48 }}>{officer.name.charAt(0)}</Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={officer.name}
                        primaryTypographyProps={{ fontSize: '1.05rem', fontWeight: 500 }}
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ fontSize: '0.9rem' }}>
                              {officer.badge}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              color="text.secondary"
                              sx={{ fontSize: '0.9rem', mt: 0.5 }}
                            >
                              {officer.location}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                
                <ListItem sx={{ bgcolor: 'rgba(158, 158, 158, 0.12)', py: 1.5 }}>
                  <ListItemText 
                    primary="Off Duty" 
                    primaryTypographyProps={{ variant: 'subtitle2', fontSize: '1.1rem' }}
                  />
                </ListItem>
                
                {officers
                  .filter(officer => officer.status === 'off-duty')
                  .map(officer => (
                    <ListItem key={officer.id} sx={{ py: 1.5 }}>
                      <ListItemAvatar>
                        <Badge
                          color="default"
                          variant="dot"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          overlap="circular"
                          sx={{ '& .MuiBadge-badge': { height: 12, width: 12, borderRadius: 6 } }}
                        >
                          <Avatar src={officer.avatar} sx={{ width: 48, height: 48, filter: 'grayscale(100%)' }}>
                            {officer.name.charAt(0)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={officer.name}
                        primaryTypographyProps={{ fontSize: '1.05rem', fontWeight: 500 }}
                        secondary={
                          <>
                            <Typography variant="body2" component="span" sx={{ fontSize: '0.9rem' }}>
                              {officer.badge}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              color="text.secondary"
                              sx={{ fontSize: '0.9rem', mt: 0.5 }}
                            >
                              {officer.location}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Dispatch Dialog */}
        <Dialog
          open={dispatchDialogOpen}
          onClose={handleDispatchClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ fontSize: '1.4rem', pb: 1 }}>
            Dispatch Officers
            {selectedIncident && (
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem', mt: 0.5 }}>
                {selectedIncident.type} at {selectedIncident.location}
              </Typography>
            )}
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
              <InputLabel sx={{ fontSize: '1rem' }}>Select Officers</InputLabel>
              <Select
                multiple
                value={selectedOfficers}
                onChange={handleOfficerSelect}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {selected.map((officerId) => {
                      const officer = officers.find((o) => o.id === officerId);
                      return (
                        <Chip
                          key={officerId}
                          label={officer.name}
                          size="medium"
                          sx={{ fontSize: '0.9rem' }}
                        />
                      );
                    })}
                  </Box>
                )}
                sx={{ fontSize: '1rem' }}
              >
                {availableOfficers.map((officer) => (
                  <MenuItem key={officer.id} value={officer.id} sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={officer.avatar} 
                        sx={{ width: 36, height: 36, mr: 2 }}
                      >
                        {officer.name.charAt(0)}
                      </Avatar>
                      <Typography sx={{ fontSize: '1rem' }}>
                        {officer.name} ({officer.badge})
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              label="Dispatch Notes"
              fullWidth
              multiline
              rows={3}
              value={dispatchNote}
              onChange={(e) => setDispatchNote(e.target.value)}
              placeholder="Add any important information for the officers..."
              InputProps={{
                style: { fontSize: '1rem' }
              }}
              InputLabelProps={{
                style: { fontSize: '1rem' }
              }}
            />

            {availableOfficers.length === 0 && (
              <Alert severity="warning" sx={{ mt: 3, py: 1.5, fontSize: '1rem' }}>
                No officers are currently available for dispatch.
              </Alert>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleDispatchClose} size="large" sx={{ fontSize: '1rem' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDispatchSubmit}
              disabled={selectedOfficers.length === 0}
              startIcon={<SendIcon />}
              size="large"
              sx={{ fontSize: '1rem' }}
            >
              Dispatch
            </Button>
          </DialogActions>
        </Dialog>

        {/* Incident Details Dialog */}
        <Dialog
          open={incidentDetailsOpen}
          onClose={handleIncidentDetailsClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          {selectedIncident && (
            <>
              <DialogTitle sx={{ fontSize: '1.4rem', pb: 1 }}>
                Incident Details
                <IconButton
                  aria-label="close"
                  onClick={handleIncidentDetailsClose}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                  }}
                >
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers sx={{ p: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      {selectedIncident.type}
                    </Typography>
                    <Box sx={{ mb: 3, mt: 1 }}>
                      {getPriorityChip(selectedIncident.priority)}
                      {' '}
                      {getStatusChip(selectedIncident.status)}
                    </Box>
                    
                    <Typography variant="subtitle2" sx={{ fontSize: '1.1rem', mb: 1 }}>Description:</Typography>
                    <Typography paragraph sx={{ fontSize: '1.05rem', mb: 3 }}>
                      {selectedIncident.description}
                    </Typography>
                    
                    <Typography variant="subtitle2" sx={{ fontSize: '1.1rem', mb: 1 }}>Location:</Typography>
                    <Typography paragraph sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      fontSize: '1.05rem', 
                      mb: 3 
                    }}>
                      <LocationOnIcon sx={{ mr: 1, fontSize: '1.3rem' }} />
                      {selectedIncident.location}
                    </Typography>
                    
                    <Typography variant="subtitle2" sx={{ fontSize: '1.1rem', mb: 1 }}>Reported:</Typography>
                    <Typography paragraph sx={{ fontSize: '1.05rem', mb: 3 }}>
                      {format(new Date(selectedIncident.reportedAt), 'MMMM d, yyyy h:mm a')}
                    </Typography>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="subtitle2" sx={{ fontSize: '1.1rem', mb: 2 }}>Reported By:</Typography>
                    {selectedIncident.isAnonymous ? (
                      <Typography sx={{ fontSize: '1.05rem' }}>Anonymous</Typography>
                    ) : (
                      <Box sx={{ mt: 1 }}>
                        <Typography sx={{ fontSize: '1.05rem', mb: 1 }}><strong>Name:</strong> {selectedIncident.reportedBy.name}</Typography>
                        <Typography sx={{ fontSize: '1.05rem', mb: 1 }}><strong>Matric Number:</strong> {selectedIncident.reportedBy.matricNumber}</Typography>
                        <Typography sx={{ fontSize: '1.05rem', mb: 1 }}><strong>Phone:</strong> {selectedIncident.reportedBy.phoneNumber}</Typography>
                        <Typography sx={{ fontSize: '1.05rem', mb: 1 }}><strong>Course:</strong> {selectedIncident.reportedBy.course}</Typography>
                        <Typography sx={{ fontSize: '1.05rem', mb: 1 }}><strong>Department:</strong> {selectedIncident.reportedBy.department}</Typography>
                      </Box>
                    )}
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    {/* Incident Image */}
                    {selectedIncident.hasImage && (
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1.1rem', mb: 1 }}>
                          Incident Photo:
                        </Typography>
                        <img 
                          src={selectedIncident.imagePath} 
                          alt="Incident" 
                          style={{ 
                            width: '100%', 
                            borderRadius: 12, 
                            maxHeight: 300, 
                            objectFit: 'cover',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        />
                      </Box>

                    )}
                    
                    {/* Map Preview (placeholder) */}
                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1.1rem', mb: 1 }}>Location Map:</Typography>
                    <Box
                      sx={{
                        height: 240,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        border: '1px solid #eee',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                      }}
                    >
                      <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>Map View</Typography>
                    </Box>
                    
                    {/* Assigned Officers */}
                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1.1rem', mb: 1 }}>Assigned Officers:</Typography>
                    {selectedIncident.assignedOfficers.length > 0 ? (
                      <List dense sx={{ 
                        bgcolor: 'background.paper', 
                        borderRadius: 2,
                        border: '1px solid #eee',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        {selectedIncident.assignedOfficers.map((officer, index) => (
                          <ListItem key={index} sx={{ py: 1.5 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ width: 40, height: 40 }}>
                                {officer.name.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography sx={{ fontSize: '1.05rem', fontWeight: 500 }}>{officer.name}</Typography>}
                              secondary={
                                <>
                                  <Typography component="span" variant="body2" sx={{ fontSize: '0.95rem' }}>
                                    Status: {officer.status}
                                  </Typography>
                                  {officer.estimatedArrival && (
                                    <Typography component="span" variant="body2" sx={{ fontSize: '0.95rem' }}>
                                      {' • ETA: '}
                                      {officer.estimatedArrival}
                                    </Typography>
                                  )}
                                </>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
                        No officers assigned yet
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={handleIncidentDetailsClose} size="large" sx={{ fontSize: '1rem' }}>Close</Button>
                {selectedIncident.status !== 'resolved' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleIncidentDetailsClose();
                      handleDispatchOpen(selectedIncident);
                    }}
                    startIcon={<SendIcon />}
                    disabled={availableOfficers.length === 0}
                    size="large"
                    sx={{ fontSize: '1rem' }}
                  >
                    Dispatch Officers
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default DispatchSystem;