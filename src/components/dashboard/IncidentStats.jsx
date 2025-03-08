import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

function IncidentStats() {
  const { incidents } = useSelector((state) => state.incidents);
  
  // Calculate stats
  const totalIncidents = incidents.length;
  const pendingIncidents = incidents.filter((i) => i.status === 'pending').length;
  const resolvedIncidents = incidents.filter((i) => i.status === 'resolved').length;
  const highPriorityIncidents = incidents.filter((i) => i.priority === 'high').length;

  const stats = [
    {
      title: 'Total Incidents',
      value: totalIncidents,
      icon: <WarningIcon fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Pending',
      value: pendingIncidents,
      icon: <LocalPoliceIcon fontSize="large" />,
      color: '#ff9800',
    },
    {
      title: 'Resolved',
      value: resolvedIncidents,
      icon: <CheckCircleIcon fontSize="large" />,
      color: '#4caf50',
    },
    {
      title: 'High Priority',
      value: highPriorityIncidents,
      icon: <PriorityHighIcon fontSize="large" />,
      color: '#f44336',
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 130,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: `${stat.color}30`,
              }}
            >
              {stat.icon}
            </Box>
            <Typography
              component="h2"
              variant="h6"
              color="text.secondary"
              gutterBottom
            >
              {stat.title}
            </Typography>
            <Typography component="p" variant="h3">
              {stat.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default IncidentStats;