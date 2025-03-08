import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFound() {
  return (
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }}
>
  <Typography variant="h1" sx={{ mb: 2 }}>
    404
  </Typography>
  <Typography variant="h5" sx={{ mb: 4 }}>
    Page not found
  </Typography>
  <Button variant="contained" component={RouterLink} to="/">
    Go to Dashboard
  </Button>
</Box>
);
}

export default NotFound;