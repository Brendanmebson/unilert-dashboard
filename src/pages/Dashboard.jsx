import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidents } from '../features/incidents/incidentsSlice';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import DashboardMap from '../components/dashboard/DashboardMap';
import IncidentStats from '../components/dashboard/IncidentStats';
import RecentIncidents from '../components/dashboard/RecentIncidents';
import StatusDistribution from '../components/dashboard/StatusDistribution';

function Dashboard() {
  const dispatch = useDispatch();
  const { incidents, isLoading } = useSelector((state) => state.incidents);

  useEffect(() => {
    dispatch(getIncidents());
  }, [dispatch]);

  if (isLoading && incidents.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <IncidentStats />
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Incident Map
            </Typography>
            <DashboardMap />
          </Paper>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Status Distribution
            </Typography>
            <StatusDistribution />
          </Paper>
        </Grid>

        {/* Recent Incidents */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Incidents
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <RecentIncidents />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;