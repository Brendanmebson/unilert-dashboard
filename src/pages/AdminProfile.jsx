import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  TextField,
  IconButton,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Chip,
  Badge,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyIcon from '@mui/icons-material/Key';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EventNoteIcon from '@mui/icons-material/EventNote';

function AdminProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    id: 'SEC-1204',
    name: 'James Wilson',
    email: 'james.wilson@campus.edu',
    phone: '(555) 123-4567',
    role: 'Chief Security Officer',
    department: 'Campus Security',
    location: 'Security HQ, Building 5',
    status: 'active',
    lastLogin: '2025-03-08T08:30:00Z',
    joinDate: '2022-05-15',
    badgeNumber: 'B-0042',
    emergencyContact: 'Sarah Wilson (555) 987-6543',
    notificationsEnabled: true,
    twoFactorEnabled: true,
    profileComplete: true,
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSwitchChange = (name) => (event) => {
    setProfileData(prevData => ({
      ...prevData,
      [name]: event.target.checked
    }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', fontSize: '2.5rem' }}>
          <SecurityIcon sx={{ mr: 2, fontSize: '2.7rem', color: '#0055a5' }} />
          Profile Settings
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ 
              fontSize: '1.6rem', 
              py: 1.2,
              px: 3,
              borderRadius: 2,
              boxShadow: '0 4px 10px rgba(0, 85, 165, 0.15)',
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{ 
                fontSize: '1.6rem', 
                py: 1.2,
                px: 3,
                borderRadius: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={isLoading}
              sx={{ 
                fontSize: '1.6rem', 
                py: 1.2,
                px: 3,
                borderRadius: 2,
                boxShadow: '0 4px 10px rgba(0, 85, 165, 0.15)',
              }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Main Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 3, 
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Profile Background */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: 100, 
                bgcolor: 'primary.main',
                background: 'linear-gradient(90deg, #0055a5 0%, #0077cc 100%)',
              }} 
            />
            
            {/* Avatar */}
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Chip 
                  label={profileData.status === 'active' ? 'Online' : 'Offline'} 
                  color="success" 
                  size="small" 
                  sx={{ height: 24, fontSize: '1.35rem' }} 
                />
              }
            >
              <Avatar 
                src={profileData.avatar} 
                alt={profileData.name}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mt: 2, 
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </Badge>
            
            {/* Name and Role */}
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
              {profileData.name}
            </Typography>
            <Chip 
              icon={<SecurityIcon />} 
              label={profileData.role} 
              color="primary" 
              sx={{ mt: 1, fontSize: '1.5rem', height: 32 }} 
            />
            
            <Divider sx={{ width: '100%', my: 3 }} />
            
            {/* Profile Details */}
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemIcon>
                  <BadgeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="ID"
                  secondary={profileData.id}
                  primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                  secondaryTypographyProps={{ fontSize: '1.6rem', fontWeight: 'medium' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    label="Email"
                  />
                ) : (
                  <ListItemText 
                    primary="Email"
                    secondary={profileData.email}
                    primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                    secondaryTypographyProps={{ fontSize: '1.6rem' }}
                  />
                )}
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    label="Phone"
                  />
                ) : (
                  <ListItemText 
                    primary="Phone"
                    secondary={profileData.phone}
                    primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                    secondaryTypographyProps={{ fontSize: '1.6rem' }}
                  />
                )}
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <WorkIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Department"
                  secondary={profileData.department}
                  primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                  secondaryTypographyProps={{ fontSize: '1.6rem' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon color="primary" />
                </ListItemIcon>
                {isEditing ? (
                  <TextField
                    fullWidth
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    label="Location"
                  />
                ) : (
                  <ListItemText 
                    primary="Location"
                    secondary={profileData.location}
                    primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                    secondaryTypographyProps={{ fontSize: '1.6rem' }}
                  />
                )}
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <VerifiedUserIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Badge Number"
                  secondary={profileData.badgeNumber}
                  primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                  secondaryTypographyProps={{ fontSize: '1.6rem' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <EventNoteIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Joined"
                  secondary={new Date(profileData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  primaryTypographyProps={{ fontSize: '1.4rem', color: 'text.secondary' }}
                  secondaryTypographyProps={{ fontSize: '1.6rem' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Right Column - Tabs with Settings */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              height: '100%',
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': { 
                  fontSize: '1.6rem',
                  py: 2, 
                }
              }}
            >
              <Tab icon={<PersonIcon />} label="Account" iconPosition="start" />
              <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
              <Tab icon={<KeyIcon />} label="Security" iconPosition="start" />
              <Tab icon={<HistoryIcon />} label="Activity" iconPosition="start" />
            </Tabs>
            
            {/* Account Tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Account Information</Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Title/Role"
                      name="role"
                      value={profileData.role}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Badge Number"
                      name="badgeNumber"
                      value={profileData.badgeNumber}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Emergency Contact"
                      name="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={handleChange}
                      fullWidth
                      disabled={!isEditing}
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Notifications Tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 , width: 1300,}}>
                <Typography variant="h6" sx={{ mb: 3 }}>Notification Settings</Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Emergency Alerts" 
                      secondary="Receive high-priority alerts for critical campus incidents"
                    />
                    <Switch
                      edge="end"
                      checked={profileData.notificationsEnabled}
                      onChange={handleSwitchChange('notificationsEnabled')}
                      disabled={!isEditing}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Shift Notifications" 
                      secondary="Receive reminders about upcoming shifts and schedule changes"
                    />
                    <Switch
                      edge="end"
                      checked={true}
                      disabled={!isEditing}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="System Announcements" 
                      secondary="Updates about the security system and new features"
                    />
                    <Switch
                      edge="end"
                      checked={true}
                      disabled={!isEditing}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive alerts via email in addition to system notifications"
                    />
                    <Switch
                      edge="end"
                      checked={false}
                      disabled={!isEditing}
                    />
                  </ListItem>
                </List>
              </Box>
            )}
            
            {/* Security Tab */}
            {tabValue === 2 && (
              <Box sx={{ p: 3 , width: 1300, }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Security Settings</Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <KeyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Two-Factor Authentication" 
                      secondary="Add an extra layer of security to your account"
                    />
                    <Switch
                      edge="end"
                      checked={profileData.twoFactorEnabled}
                      onChange={handleSwitchChange('twoFactorEnabled')}
                      disabled={!isEditing}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemText primary="Change Password" />
                    <Button 
                      variant="outlined" 
                      disabled={!isEditing}
                      sx={{ fontSize: '1.4rem' }}
                    >
                      Change
                    </Button>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Login Sessions" 
                      secondary="Manage your active sessions across devices"
                    />
                    <Button 
                      variant="outlined" 
                      color="error" 
                      disabled={!isEditing}
                      sx={{ fontSize: '1.4rem' }}
                    >
                      Manage
                    </Button>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Account Permissions" 
                      secondary="View and manage your security access levels"
                    />
                    <Button 
                      variant="outlined" 
                      disabled={!isEditing}
                      sx={{ fontSize: '1.4rem' }}
                    >
                      View
                    </Button>
                  </ListItem>
                </List>
              </Box>
            )}
            
            {/* Activity Tab */}
            {tabValue === 3 && (
  <Box sx={{ 
    p: 3,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    width: 1300,
  }}>
  
  <Typography variant="h6" sx={{ mb: 3 }}>Recent Activity</Typography>
                
                <List>
                  <ListItem sx={{ pb: 2 }}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="System Login" 
                      secondary="Today, 8:30 AM from Campus Security HQ"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Incident Report Filed" 
                      secondary="Yesterday, 3:45 PM - ID #INC-2025-0342"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Security Alert Responded" 
                      secondary="Yesterday, 2:15 PM - Science Building"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="System Login" 
                      secondary="Yesterday, 9:00 AM from Mobile Device"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Password Changed" 
                      secondary="March 6, 2025, 10:20 AM"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItem>
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button variant="text" sx={{ fontSize: '1.5rem' }}>
                    View Full Activity Log
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function PersonIcon() {
  return <SecurityIcon />;
}

export default AdminProfile;