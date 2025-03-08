import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/users/usersSlice';
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
  CircularProgress,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';

function Users() {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, height: '60vh', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#0055a5' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(244, 67, 54, 0.08)', borderRadius: 2 }}>
        <Typography variant="h6" color="error" sx={{ fontSize: '1.3rem' }}>
          Error: {message}
        </Typography>
      </Box>
    );
  }

  // Get role icon based on user role
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettingsIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />;
      case 'security':
        return <SecurityIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />;
      default:
        return <PersonIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', fontSize: '2rem' }}>
          <PersonIcon sx={{ mr: 2, fontSize: '2.2rem', color: '#0055a5' }} />
          Users Management
        </Typography>
        <Tooltip title="Filter users">
          <IconButton sx={{ bgcolor: 'rgba(0, 85, 165, 0.08)', mr: 1 }}>
            <FilterListIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(0, 85, 165, 0.05)' }}>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 600, py: 2.5 }}>Name</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 600, py: 2.5 }}>Email</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 600, py: 2.5 }}>Role</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 600, py: 2.5 }}>Status</TableCell>
              <TableCell sx={{ fontSize: '1.2rem', fontWeight: 600, py: 2.5, width: 80 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow 
                  key={user.id}
                  sx={{ 
                    '&:hover': { bgcolor: 'rgba(0, 85, 165, 0.03)' },
                    transition: 'background-color 0.2s',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          width: 50, 
                          height: 50,
                          bgcolor: user.role === 'admin' ? '#0055a5' : 
                                   user.role === 'security' ? '#E53935' : '#607d8b',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          border: '2px solid #fff'
                        }}
                      >
                        {user.name[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontSize: '1.3rem', fontWeight: 600 }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getRoleIcon(user.role)}
                      label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      color={
                        user.role === 'admin'
                          ? 'primary'
                          : user.role === 'security'
                          ? 'error'
                          : 'default'
                      }
                      sx={{ 
                        fontSize: '1rem', 
                        fontWeight: 500,
                        px: 1,
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      color={user.status === 'active' ? 'success' : 'error'}
                      variant={user.status === 'active' ? 'outlined' : 'filled'}
                      sx={{ 
                        fontSize: '1rem', 
                        fontWeight: 500,
                        px: 1
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="medium" sx={{ color: 'text.secondary' }}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <PersonIcon sx={{ fontSize: '3rem', color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6" sx={{ fontSize: '1.3rem', color: 'text.secondary' }}>
                      No users found
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      There are no users in the system at the moment
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Users;