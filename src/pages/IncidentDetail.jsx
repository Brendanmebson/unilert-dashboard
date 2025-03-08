import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIncidentById,
  updateIncidentStatus,
  reset,
} from '../features/incidents/incidentsSlice';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import WarningIcon from '@mui/icons-material/Warning';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IncidentMap from '../components/maps/IncidentMap';

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { incident, isLoading, isError, message } = useSelector(
    (state) => state.incidents
  );

  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getIncidentById(id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (incident) {
      setStatus(incident.status);
    }
  }, [incident]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    dispatch(updateIncidentStatus({ id, status: newStatus }));
  };

  const getStatusChip = (status) => {
    if (!status) return null;
    
    const statusColors = {
      pending: 'warning',
      'in-progress': 'info',
      resolved: 'success',
    };

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
        color={statusColors[status] || 'default'}
      />
    );
  };

  const getPriorityChip = (priority) => {
    if (!priority) return null;
    
    const priorityColors = {
      high: 'error',
      medium: 'warning',
      low: 'success',
    };

    return (
      <Chip
        label={priority.charAt(0).toUpperCase() + priority.slice(1)}
        color={priorityColors[priority] || 'default'}
      />
    );
  };

  // Safely format date with fallback
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unavailable';
    
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Date unavailable';
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Error: {message}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/incidents')}
          sx={{ mt: 2 }}
        >
          Back to Incidents
        </Button>
      </Box>
    );
  }

  if (!incident) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Incident not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/incidents')}
          sx={{ mt: 2 }}
        >
          Back to Incidents
        </Button>
      </Box>
    );
  }

  // Check if reporter info exists and is not anonymous
  const hasReporterInfo = incident.reportedBy && 
                          !incident.isAnonymous && 
                          incident.reportedBy.name;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/incidents')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Incident Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Incident Details Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Incident Information"
              subheader={`Reported on ${formatDate(incident.reportedAt)}`}
              action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {incident.priority && getPriorityChip(incident.priority)}
                  {incident.status && getStatusChip(incident.status)}
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    {incident.type || 'Not specified'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    {incident.location || 'Location not specified'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {incident.description || 'No description provided'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      label="Status"
                      onChange={handleStatusChange}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          {/* Reporter Information Card */}
          <Card sx={{ mt: 3 }}>
            <CardHeader 
              title="Reporter Information" 
              avatar={
                <Avatar sx={{ bgcolor: incident.isAnonymous ? 'grey.500' : 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
              }
            />
            <Divider />
            <CardContent>
              {incident.isAnonymous ? (
                <Alert severity="info" sx={{ mb: 0 }}>
                  This incident was reported anonymously
                </Alert>
              ) : hasReporterInfo ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {incident.reportedBy.name}
                    </Typography>
                  </Grid>
                  
                  {incident.reportedBy.matricNumber && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Matric Number
                      </Typography>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {incident.reportedBy.matricNumber}
                      </Typography>
                    </Grid>
                  )}
                  
                  {incident.reportedBy.phoneNumber && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {incident.reportedBy.phoneNumber}
                      </Typography>
                    </Grid>
                  )}
                  
                  {incident.reportedBy.course && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Course
                      </Typography>
                      <Typography variant="body1">
                        {incident.reportedBy.course}
                      </Typography>
                    </Grid>
                  )}
                  
                  {incident.reportedBy.department && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Department
                      </Typography>
                      <Typography variant="body1">
                        {incident.reportedBy.department}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Alert severity="info" sx={{ mb: 0 }}>
                  Reporter information not available
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Column - Map and Image */}
        <Grid item xs={12} md={6}>
          {/* Map */}
          <Paper sx={{ height: 350, overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
              Location
            </Typography>
            <Box sx={{ height: 'calc(100% - 57px)' }}>
              <IncidentMap location={incident.coordinates} />
            </Box>
          </Paper>
          
          {/* Incident Image (if available) */}
          {incident.hasImage && incident.imagePath && (
            <Card sx={{ mt: 3 }}>
              <CardHeader title="Incident Photo" />
              <Divider />
              <CardContent sx={{ textAlign: 'center' }}>
                <Box 
                  component="img" 
                  src={incident.imagePath} 
                  alt="Incident" 
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: 300,
                    borderRadius: 1,
                  }} 
                />
              </CardContent>
            </Card>
          )}
          
          {/* Assigned Officers Card */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Assigned Officers" />
            <Divider />
            <CardContent>
              {incident.assignedOfficers && incident.assignedOfficers.length > 0 ? (
                <Grid container spacing={2}>
                  {incident.assignedOfficers.map((officer, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>
                          {officer.name ? officer.name.charAt(0) : 'O'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1">{officer.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Status: {officer.status}
                            {officer.estimatedArrival && ` • ETA: ${officer.estimatedArrival}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Alert severity="info">
                  No officers have been assigned to this incident yet.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IncidentDetail;