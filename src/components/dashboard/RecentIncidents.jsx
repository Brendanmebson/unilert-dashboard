import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';

function RecentIncidents() {
  const { incidents, isLoading } = useSelector((state) => state.incidents);
  
  // Format date safely
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Date unavailable';
    }
  };

  // Sort incidents by date (newest first), if incidents exist
  const getRecentIncidents = () => {
    if (!incidents || incidents.length === 0) return [];
    
    const sortedIncidents = [...incidents].sort((a, b) => {
      if (!a.reportedAt) return 1;
      if (!b.reportedAt) return -1;
      return new Date(b.reportedAt) - new Date(a.reportedAt);
    });
    
    // Get only the 5 most recent incidents
    return sortedIncidents.slice(0, 5);
  };

  const recentIncidents = getRecentIncidents();

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
        size="small"
        sx={{ fontSize: '0.9rem' }}
      />
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Type</TableCell>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Description</TableCell>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Reported By</TableCell>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentIncidents.length > 0 ? (
            recentIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell sx={{ fontSize: '1.25rem' }}>{incident.type || 'N/A'}</TableCell>
                <TableCell sx={{ fontSize: '1.25rem' }}>
                  {incident.description ?
                    (incident.description.length > 30 ?
                      `${incident.description.substring(0, 30)}...` :
                      incident.description) :
                    'No description'}
                </TableCell>
                <TableCell sx={{ fontSize: '1.25rem' }}>
                  {incident.isAnonymous ?
                    'Anonymous' :
                    (incident.reportedBy && incident.reportedBy.name ?
                      incident.reportedBy.name :
                      'Unknown')}
                </TableCell>
                <TableCell sx={{ fontSize: '1.25rem' }}>
                  {incident.reportedAt ? formatDate(incident.reportedAt) : 'N/A'}
                </TableCell>
                <TableCell>{getStatusChip(incident.status)}</TableCell>
                <TableCell>
                  <Button
                    component={RouterLink}
                    to={`/incidents/${incident.id}`}
                    variant="contained"
                    size="medium"
                    sx={{ fontSize: '0.9rem' }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Alert severity="info">
                  <Typography sx={{ fontSize: '1rem' }}>
                    No recent incidents found
                  </Typography>
                </Alert>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecentIncidents;