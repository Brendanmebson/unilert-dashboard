import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getIncidents, reset } from '../features/incidents/incidentsSlice';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';

function IncidentList() {
  const dispatch = useDispatch();
  const { incidents, isLoading, isError, message } = useSelector(
    (state) => state.incidents
  );

  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
    status: 'all',
    priority: 'all',
  });

  useEffect(() => {
    dispatch(getIncidents());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (incidents && incidents.length > 0) {
      applyFilters();
    } else {
      setFilteredIncidents([]);
    }
  }, [incidents, filter]);

  const applyFilters = () => {
    if (!incidents) return;
    
    let filtered = [...incidents];

    // Apply search filter
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filtered = filtered.filter(
        (incident) =>
          (incident.type && incident.type.toLowerCase().includes(searchTerm)) ||
          (incident.description && incident.description.toLowerCase().includes(searchTerm)) ||
          (incident.reportedBy && !incident.isAnonymous && incident.reportedBy.name && 
           incident.reportedBy.name.toLowerCase().includes(searchTerm))
      );
    }

    // Apply status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter((incident) => incident.status === filter.status);
    }

    // Apply priority filter
    if (filter.priority !== 'all') {
      filtered = filtered.filter((incident) => incident.priority === filter.priority);
    }

    setFilteredIncidents(filtered);
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
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
        size="small"
        sx={{ fontSize: '0.9rem' }}
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
        size="small"
        sx={{ fontSize: '0.9rem' }}
      />
    );
  };

  // Format date safely
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Date unavailable';
    }
  };

  if (isLoading && (!incidents || incidents.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">
          <Typography sx={{ fontSize: '1rem' }}>Error: {message}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: '2rem' }}>
          Incident Reports
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            name="search"
            label="Search"
            variant="outlined"
            size="small"
            value={filter.search}
            onChange={handleFilterChange}
            sx={{ minWidth: 200, flexGrow: 1, '& .MuiInputBase-input': { fontSize: '1rem' }, '& .MuiInputLabel-root': { fontSize: '1rem' } }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ fontSize: '1rem' }}>Status</InputLabel>
            <Select
              name="status"
              value={filter.status}
              label="Status"
              onChange={handleFilterChange}
              sx={{ fontSize: '1rem' }}
            >
              <MenuItem value="all" sx={{ fontSize: '1rem' }}>All</MenuItem>
              <MenuItem value="pending" sx={{ fontSize: '1rem' }}>Pending</MenuItem>
              <MenuItem value="in-progress" sx={{ fontSize: '1rem' }}>In Progress</MenuItem>
              <MenuItem value="resolved" sx={{ fontSize: '1rem' }}>Resolved</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ fontSize: '1rem' }}>Priority</InputLabel>
            <Select
              name="priority"
              value={filter.priority}
              label="Priority"
              onChange={handleFilterChange}
              sx={{ fontSize: '1rem' }}
            >
              <MenuItem value="all" sx={{ fontSize: '1rem' }}>All</MenuItem>
              <MenuItem value="high" sx={{ fontSize: '1rem' }}>High</MenuItem>
              <MenuItem value="medium" sx={{ fontSize: '1rem' }}>Medium</MenuItem>
              <MenuItem value="low" sx={{ fontSize: '1rem' }}>Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Reported By</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell sx={{ fontSize: '1.25rem' }}>{incident.type || 'N/A'}</TableCell>
                  <TableCell sx={{ fontSize: '1.25rem' }}>{incident.description ? 
                    (incident.description.length > 50 ? 
                      `${incident.description.substring(0, 50)}...` : 
                      incident.description) : 
                    'No description'}</TableCell>
                  <TableCell sx={{ fontSize: '1.25rem' }}>
                    {incident.isAnonymous ? 
                      'Anonymous' : 
                      (incident.reportedBy && incident.reportedBy.name ? 
                        incident.reportedBy.name : 
                        'Unknown')}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.25rem' }}>{incident.reportedAt ? formatDate(incident.reportedAt) : 'N/A'}</TableCell>
                  <TableCell>{getStatusChip(incident.status)}</TableCell>
                  <TableCell>{getPriorityChip(incident.priority)}</TableCell>
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
                <TableCell colSpan={7} align="center" sx={{ fontSize: '1rem' }}>
                  No incidents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default IncidentList;