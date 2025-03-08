import { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Snackbar,
  IconButton,
  Tooltip,
  Avatar,
  CircularProgress,
  Backdrop,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import BackupIcon from '@mui/icons-material/Backup';
import StorageIcon from '@mui/icons-material/Storage';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';

function Settings() {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    campusName: 'Babcock University',
    emergencyContact: '+234 1234567890',
    email: 'security@babcock.edu.ng',
    language: 'english',
    timeZone: 'Africa/Lagos',
    autoLogout: 30
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    desktopNotifications: true,
    incidentAlerts: true,
    systemUpdates: false,
    maintenanceAlerts: true,
    alertSound: true,
    alertVolume: 80
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    sessionTimeout: true,
    ipRestriction: false,
    loginHistory: [
      { date: '2025-03-07 14:32:45', ip: '192.168.1.105', location: 'Campus Office' },
      { date: '2025-03-06 09:15:22', ip: '197.210.53.8', location: 'Off-campus' },
      { date: '2025-03-05 16:48:37', ip: '192.168.1.105', location: 'Campus Office' }
    ]
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: mode === 'dark',
    primaryColor: 'blue',
    denseLayout: false,
    fontSize: 'medium'
  });

  // Data Management Settings
  const [dataSettings, setDataSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    dataSharing: false,
    analyticsEnabled: true
  });

  useEffect(() => {
    setAppearanceSettings(prev => ({
      ...prev,
      darkMode: mode === 'dark'
    }));
  }, [mode]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleVolumeChange = (e) => {
    setNotificationSettings(prev => ({
      ...prev,
      alertVolume: e.target.value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleAppearanceChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleDataChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;
    setDataSettings(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleSave = (tab) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showSnackbar('Settings saved successfully!', 'success');
      
      // Additional validation for password change
      if (tab === 2 && securitySettings.newPassword) {
        if (securitySettings.newPassword !== securitySettings.confirmPassword) {
          showSnackbar('Passwords do not match!', 'error');
          return;
        }
        if (securitySettings.newPassword.length < 8) {
          showSnackbar('Password must be at least 8 characters!', 'warning');
          return;
        }
        showSnackbar('Password updated successfully!', 'success');
        setSecuritySettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }
    }, 1500);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box 
      sx={{ 
        width: '70vw',
        height: '85vh', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden' 
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        width: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(45deg, #2A3EB1 30%,rgb(150, 179, 172) 90%)' 
          : 'linear-gradient(45deg, #4158D0 30%,rgb(172, 206, 201) 90%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%' }}>
          <Avatar 
            sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: theme.palette.background.paper,
              color: theme.palette.primary.main,
              mr: 2
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Settings
            </Typography>
            <Typography variant="subtitle1">
              Configure your security dashboard preferences
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        {isMobile ? (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            sx={{ width: '100%' }}
          >
            <Tab icon={<SettingsIcon />} iconPosition="start" label="General" />
            <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
            <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" />
            <Tab icon={<ColorLensIcon />} iconPosition="start" label="Appearance" />
            <Tab icon={<StorageIcon />} iconPosition="start" label="Data" />
          </Tabs>
        ) : (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{ width: '100%' }}
          >
            <Tab icon={<SettingsIcon />} iconPosition="start" label="General" />
            <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
            <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" />
            <Tab icon={<ColorLensIcon />} iconPosition="start" label="Appearance" />
            <Tab icon={<StorageIcon />} iconPosition="start" label="Data" />
          </Tabs>
        )}
      </Box>

      {/* Content Area */}
      <Box 
        sx={{ 
          flex: 1, 
          p: 2, 
          overflowY: 'auto',
          width: '100%',
          maxWidth: '100%'
        }}
      >
        {/* General Settings */}
        {activeTab === 0 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Campus Information
                </Typography>
                
                <TextField
                  fullWidth
                  label="Campus Name"
                  name="campusName"
                  value={generalSettings.campusName}
                  onChange={handleGeneralChange}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Emergency Contact Number"
                  name="emergencyContact"
                  value={generalSettings.emergencyContact}
                  onChange={handleGeneralChange}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={generalSettings.email}
                  onChange={handleGeneralChange}
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </Card>
            
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Regional Settings
                </Typography>
                
                <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    name="language"
                    value={generalSettings.language}
                    label="Language"
                    onChange={handleGeneralChange}
                    startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="arabic">Arabic</MenuItem>
                    <MenuItem value="yoruba">Yoruba</MenuItem>
                    <MenuItem value="igbo">Igbo</MenuItem>
                    <MenuItem value="hausa">Hausa</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                  <InputLabel>Time Zone</InputLabel>
                  <Select
                    name="timeZone"
                    value={generalSettings.timeZone}
                    label="Time Zone"
                    onChange={handleGeneralChange}
                    startAdornment={<AccessTimeIcon sx={{ mr: 1 }} />}
                  >
                    <MenuItem value="Africa/Lagos">Africa/Lagos (GMT+1)</MenuItem>
                    <MenuItem value="Europe/London">Europe/London (GMT+0)</MenuItem>
                    <MenuItem value="America/New_York">America/New York (GMT-5)</MenuItem>
                    <MenuItem value="Asia/Dubai">Asia/Dubai (GMT+4)</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel>Auto Logout (minutes)</InputLabel>
                  <Select
                    name="autoLogout"
                    value={generalSettings.autoLogout}
                    label="Auto Logout (minutes)"
                    onChange={handleGeneralChange}
                  >
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={120}>2 hours</MenuItem>
                    <MenuItem value={0}>Never</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            <Box sx={{ position: 'sticky', bottom: -19, pt: 5, pb: 1, bgcolor: theme.palette.background.default, zIndex: 1, width: '100%'    }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={() => handleSave(0)}
                disabled={loading}
                size="large"
                sx={{ width: '100%', py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        )}

        {/* Notification Settings */}
        {activeTab === 1 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Notification Methods
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      <IconButton color={notificationSettings.emailNotifications ? "primary" : "default"}>
                        {notificationSettings.emailNotifications ? <DoneIcon /> : <BlockIcon />}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications" 
                      secondary="Receive email notifications for new incidents" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <IconButton color={notificationSettings.smsNotifications ? "primary" : "default"}>
                        {notificationSettings.smsNotifications ? <DoneIcon /> : <BlockIcon />}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText 
                      primary="SMS Notifications" 
                      secondary="Receive SMS notifications for high priority incidents" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <IconButton color={notificationSettings.desktopNotifications ? "primary" : "default"}>
                        {notificationSettings.desktopNotifications ? <DoneIcon /> : <BlockIcon />}
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText 
                      primary="Desktop Notifications" 
                      secondary="Receive browser notifications when dashboard is open" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="desktopNotifications"
                        checked={notificationSettings.desktopNotifications}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Notification Types
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemText 
                      primary="Incident Alerts" 
                      secondary="Security incidents and emergency alerts" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="incidentAlerts"
                        checked={notificationSettings.incidentAlerts}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="System Updates" 
                      secondary="Updates to the security dashboard system" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="systemUpdates"
                        checked={notificationSettings.systemUpdates}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemText 
                      primary="Maintenance Alerts" 
                      secondary="Scheduled maintenance and downtime" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="maintenanceAlerts"
                        checked={notificationSettings.maintenanceAlerts}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Sound Settings
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        name="alertSound"
                        checked={notificationSettings.alertSound}
                        onChange={handleNotificationChange}
                        color="primary"
                      />
                    }
                    label="Alert Sound"
                  />
                  <IconButton color="primary" disabled={!notificationSettings.alertSound}>
                    <VolumeUpIcon />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" gutterBottom>
                  Alert Volume: {notificationSettings.alertVolume}%
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={notificationSettings.alertVolume}
                    onChange={handleVolumeChange}
                    disabled={!notificationSettings.alertSound}
                    style={{ width: '100%' }}
                  />
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ position: 'sticky', bottom:-19 , pt: 4, pb: 1, bgcolor: theme.palette.background.default, zIndex: 1, width: '100%' }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={() => handleSave(1)}
                disabled={loading}
                size="large"
                sx={{ width: '100%', py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        )}

        {/* Security Settings */}
        {activeTab === 2 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Password Management
                </Typography>
                
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={securitySettings.currentPassword}
                  onChange={handleSecurityChange}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={handleSecurityChange}
                  margin="normal"
                  variant="outlined"
                  helperText="Password must be at least 8 characters long"
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={securitySettings.confirmPassword}
                  onChange={handleSecurityChange}
                  margin="normal"
                  variant="outlined"
                  error={securitySettings.newPassword !== securitySettings.confirmPassword && securitySettings.confirmPassword !== ''}
                  helperText={securitySettings.newPassword !== securitySettings.confirmPassword && securitySettings.confirmPassword !== '' ? "Passwords don't match" : ""}
                  sx={{ mb: 3 }}
                />
                
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleSave(2)}
                  disabled={loading || !securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword}
                  sx={{ width: '100%', py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Update Password'}
                </Button>
              </CardContent>
            </Card>
            
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Additional Security
                </Typography>
                
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color={securitySettings.twoFactorAuth ? "primary" : "action"} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Two-Factor Authentication" 
                      secondary="Require confirmation code when logging in" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="twoFactorAuth"
                        checked={securitySettings.twoFactorAuth}
                        onChange={handleSecurityChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AccessTimeIcon color={securitySettings.sessionTimeout ? "primary" : "action"} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Session Timeout" 
                      secondary="Automatically log out after period of inactivity" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="sessionTimeout"
                        checked={securitySettings.sessionTimeout}
                        onChange={handleSecurityChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <BlockIcon color={securitySettings.ipRestriction ? "primary" : "action"} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="IP Restriction" 
                      secondary="Limit access to specific IP addresses" 
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        name="ipRestriction"
                        checked={securitySettings.ipRestriction}
                        onChange={handleSecurityChange}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Login History
                </Typography>
                
                <Box sx={{ maxHeight: '300px', overflow: 'auto', width: '100%' }}>
                  <List sx={{ width: '100%' }}>
                    {securitySettings.loginHistory.map((login, index) => (
                      <ListItem key={index} divider={index < securitySettings.loginHistory.length - 1} sx={{ width: '100%' }}>
                        <ListItemIcon>
                          <HistoryIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={login.date} 
                          secondary={
                            <Box>
                              <Typography variant="body2" component="span">
                                IP: {login.ip}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span" color="text.secondary">
                                Location: {login.location}
                              </Typography>
                            </Box>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                
                <Button variant="outlined" fullWidth sx={{ mt: 3, py: 1.5 }}>
                  View Full Login History
                </Button>
              </CardContent>
            </Card>

            <Box sx={{ position: 'sticky', bottom:-19, pt: 3, pb: 1, bgcolor: theme.palette.background.default, zIndex: 1, width: '100%' }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={() => handleSave(2)}
                disabled={loading}
                size="large"
                sx={{ width: '100%', py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Save Security Settings'}
              </Button>
            </Box>
          </Box>
        )}

        {/* Appearance Settings */}
        {activeTab === 3 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Appearance Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%', 
                mb: 3, 
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                  Theme Settings
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, width: '100%' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={appearanceSettings.darkMode}
                        onChange={toggleTheme}
                        icon={<Brightness7Icon />}
                        checkedIcon={<Brightness4Icon />}
                     />
                   }
                   label={`${appearanceSettings.darkMode ? 'Dark' : 'Light'} Mode`}
                 />
                 <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                   {appearanceSettings.darkMode 
                     ? 'Reduces eye strain in low-light environments'
                     : 'Better readability in bright environments'}
                 </Typography>
               </Box>
               
               <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                 <InputLabel>Primary Color</InputLabel>
                 <Select
                   name="primaryColor"
                   value={appearanceSettings.primaryColor}
                   label="Primary Color"
                   onChange={handleAppearanceChange}
                 >
                   <MenuItem value="blue">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box sx={{ width: 20, height: 20, bgcolor: '#1976d2', borderRadius: '50%', mr: 1 }} />
                       Blue
                     </Box>
                   </MenuItem>
                   <MenuItem value="green">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box sx={{ width: 20, height: 20, bgcolor: '#2e7d32', borderRadius: '50%', mr: 1 }} />
                       Green
                     </Box>
                   </MenuItem>
                   <MenuItem value="purple">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box sx={{ width: 20, height: 20, bgcolor: '#7b1fa2', borderRadius: '50%', mr: 1 }} />
                       Purple
                     </Box>
                   </MenuItem>
                   <MenuItem value="orange">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box sx={{ width: 20, height: 20, bgcolor: '#ed6c02', borderRadius: '50%', mr: 1 }} />
                       Orange
                     </Box>
                   </MenuItem>
                   <MenuItem value="red">
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Box sx={{ width: 20, height: 20, bgcolor: '#d32f2f', borderRadius: '50%', mr: 1 }} />
                       Red
                     </Box>
                   </MenuItem>
                 </Select>
               </FormControl>
             </CardContent>
           </Card>
           
           <Card 
             variant="outlined" 
             sx={{ 
               width: '100%', 
               mb: 3, 
               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
             }}
           >
             <CardContent sx={{ p: 3 }}>
               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                 Layout & Text
               </Typography>
               
               <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
                 <InputLabel>Font Size</InputLabel>
                 <Select
                   name="fontSize"
                   value={appearanceSettings.fontSize}
                   label="Font Size"
                   onChange={handleAppearanceChange}
                 >
                   <MenuItem value="small">Small</MenuItem>
                   <MenuItem value="medium">Medium</MenuItem>
                   <MenuItem value="large">Large</MenuItem>
                 </Select>
               </FormControl>
               
               <FormControlLabel
                 control={
                   <Switch
                     name="denseLayout"
                     checked={appearanceSettings.denseLayout}
                     onChange={handleAppearanceChange}
                   />
                 }
                 label="Dense Layout"
                 sx={{ mt: 2 }}
               />
               <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
                 Compact view to fit more information on screen
               </Typography>
               
               <Box sx={{ mt: 2, width: '100%' }}>
                 <Typography variant="subtitle2" gutterBottom>
                   Preview:
                 </Typography>
                 <Paper 
                   variant="outlined" 
                   sx={{ 
                     p: 3, 
                     width: '100%',
                     fontSize: appearanceSettings.fontSize === 'small' ? '0.875rem' : 
                             appearanceSettings.fontSize === 'large' ? '1.125rem' : '1rem',
                     '& .MuiTypography-root': {
                       fontSize: 'inherit'
                     }
                   }}
                 >
                   <Typography>
                     This is how text will appear with your selected settings.
                   </Typography>
                 </Paper>
               </Box>
             </CardContent>
           </Card>

           <Box sx={{ position: 'sticky', bottom:-19, pt: 3, pb: 1, bgcolor: theme.palette.background.default, zIndex: 1, width: '100%' }}>
             <Button 
               variant="contained" 
               startIcon={<SaveIcon />}
               onClick={() => handleSave(3)}
               disabled={loading}
               size="large"
               sx={{ width: '100%', py: 1.5 }}
             >
               {loading ? <CircularProgress size={24} /> : 'Save Appearance Settings'}
             </Button>
           </Box>
         </Box>
       )}
       
       {/* Data Management Settings */}
       {activeTab === 4 && (
         <Box sx={{ width: '100%' }}>
           <Typography variant="h6" gutterBottom>
             Data Management
           </Typography>
           <Divider sx={{ mb: 3 }} />

           <Card 
             variant="outlined" 
             sx={{ 
               width: '100%', 
               mb: 3, 
               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
             }}
           >
             <CardContent sx={{ p: 3 }}>
               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                 Data Backup
               </Typography>
               
               <FormControlLabel
                 control={
                   <Switch
                     name="autoBackup"
                     checked={dataSettings.autoBackup}
                     onChange={handleDataChange}
                     color="primary"
                   />
                 }
                 label="Automatic Backup"
               />
               <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
                 Automatically backup system data
               </Typography>
               
               <FormControl fullWidth margin="normal" disabled={!dataSettings.autoBackup} sx={{ mb: 3 }}>
                 <InputLabel>Backup Frequency</InputLabel>
                 <Select
                   name="backupFrequency"
                   value={dataSettings.backupFrequency}
                   label="Backup Frequency"
                   onChange={handleDataChange}
                   startAdornment={<BackupIcon sx={{ mr: 1 }} />}
                 >
                   <MenuItem value="daily">Daily</MenuItem>
                   <MenuItem value="weekly">Weekly</MenuItem>
                   <MenuItem value="monthly">Monthly</MenuItem>
                 </Select>
               </FormControl>
               
               <FormControl fullWidth margin="normal" disabled={!dataSettings.autoBackup} sx={{ mb: 3 }}>
                 <InputLabel>Retention Period (days)</InputLabel>
                 <Select
                   name="backupRetention"
                   value={dataSettings.backupRetention}
                   label="Retention Period (days)"
                   onChange={handleDataChange}
                 >
                   <MenuItem value={7}>7 days</MenuItem>
                   <MenuItem value={30}>30 days</MenuItem>
                   <MenuItem value={90}>90 days</MenuItem>
                   <MenuItem value={365}>365 days</MenuItem>
                 </Select>
               </FormControl>
               
               <Button 
                 variant="outlined" 
                 startIcon={<BackupIcon />}
                 fullWidth
                 sx={{ py: 1.5 }}
               >
                 Backup Now
               </Button>
             </CardContent>
           </Card>
           
           <Card 
             variant="outlined" 
             sx={{ 
               width: '100%', 
               mb: 3, 
               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' 
             }}
           >
             <CardContent sx={{ p: 3 }}>
               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
                 Data Usage & Privacy
               </Typography>
               
               <List sx={{ width: '100%' }}>
                 <ListItem>
                   <ListItemIcon>
                     <GroupIcon color={dataSettings.dataSharing ? "primary" : "action"} />
                   </ListItemIcon>
                   <ListItemText 
                     primary="Data Sharing" 
                     secondary="Share anonymous usage data to improve system" 
                   />
                   <ListItemSecondaryAction>
                     <Switch
                       name="dataSharing"
                       checked={dataSettings.dataSharing}
                       onChange={handleDataChange}
                       color="primary"
                     />
                   </ListItemSecondaryAction>
                 </ListItem>
                 
                 <ListItem>
                   <ListItemIcon>
                     <HistoryIcon color={dataSettings.analyticsEnabled ? "primary" : "action"} />
                   </ListItemIcon>
                   <ListItemText 
                     primary="Analytics" 
                     secondary="Collect usage metrics to improve user experience" 
                   />
                   <ListItemSecondaryAction>
                     <Switch
                       name="analyticsEnabled"
                       checked={dataSettings.analyticsEnabled}
                       onChange={handleDataChange}
                       color="primary"
                     />
                   </ListItemSecondaryAction>
                 </ListItem>
               </List>
               
               <Divider sx={{ my: 3 }} />
               
               <Typography variant="subtitle2" gutterBottom color="text.secondary">
                 Data Management Options
               </Typography>
               
               <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                 <Button variant="outlined" color="primary" sx={{ py: 1.5 }}>
                   Export All Data
                 </Button>
                 <Button variant="outlined" color="error" sx={{ py: 1.5 }}>
                   Delete All Data
                 </Button>
               </Box>
             </CardContent>
           </Card>

           <Box sx={{ position: 'sticky', bottom:-19, pt: 3, pb: 1, bgcolor: theme.palette.background.default, zIndex: 1, width: '100%' }}>
             <Button 
               variant="contained" 
               startIcon={<SaveIcon />}
               onClick={() => handleSave(4)}
               disabled={loading}
               size="large"
               sx={{ width: '100%', py: 1.5 }}
             >
               {loading ? <CircularProgress size={24} /> : 'Save Data Settings'}
             </Button>
           </Box>
         </Box>
       )}
     </Box>

     {/* Snackbar for notifications */}
     <Snackbar
       open={snackbarOpen}
       autoHideDuration={6000}
       onClose={handleSnackbarClose}
       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
     >
       <Alert 
         onClose={handleSnackbarClose} 
         severity={snackbarSeverity} 
         sx={{ width: '100%' }}
         action={
           <IconButton
             size="small"
             aria-label="close"
             color="inherit"
             onClick={handleSnackbarClose}
           >
             <CloseIcon fontSize="small" />
           </IconButton>
         }
       >
         {snackbarMessage}
       </Alert>
     </Snackbar>

     {/* Loading backdrop */}
     <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={loading}
     >
       <CircularProgress color="inherit" />
     </Backdrop>
   </Box>
 );
}

export default Settings;