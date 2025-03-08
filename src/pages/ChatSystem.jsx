import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
  Badge as MuiBadge,
  InputAdornment,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageIcon from '@mui/icons-material/Image';
import MicIcon from '@mui/icons-material/Mic';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import { format } from 'date-fns';

// Custom theme with refined typography and colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0055a5',
      light: '#3378b8',
      dark: '#003c74',
    },
    secondary: {
      main: '#E53935',
      light: '#FF6F60',
      dark: '#AB000D',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2A2F35',
      secondary: '#505967',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", "Helvetica", "Arial", sans-serif',
    h5: {
      fontSize: '2.0rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1.85rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle2: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '1.05rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '1.05rem',
    },
    button: {
      fontSize: '1.1rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 4px 10px rgba(0, 85, 165, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0, 85, 165, 0.25)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '1.05rem',
          height: '28px',
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '1.15rem',
          fontWeight: 500,
          textTransform: 'none',
          minHeight: 48,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '16px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 12,
        },
      },
    },
  },
});

function ChatSystem() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Officer James',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      department: 'Security',
      status: 'online',
      lastMessage: 'I\'m heading to the science building now',
      unread: 2,
      messages: [
        {
          sender: 'Officer James',
          text: 'I\'ve received the alert about the incident at the science building',
          time: '2025-03-05T09:30:00Z',
          isMe: false,
        },
        {
          sender: 'Officer James',
          text: 'I\'m heading to the science building now',
          time: '2025-03-05T09:32:00Z',
          isMe: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Medical Center',
      avatar: 'https://img.icons8.com/color/96/hospital.png',
      department: 'Medical',
      status: 'online',
      lastMessage: 'We have dispatched a medical team',
      unread: 0,
      messages: [
        {
          sender: 'You',
          text: 'We have a student injured near the library, possible sprained ankle',
          time: '2025-03-05T08:45:00Z',
          isMe: true,
        },
        {
          sender: 'Medical Center',
          text: 'We have dispatched a medical team, ETA 5 minutes',
          time: '2025-03-05T08:47:00Z',
          isMe: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Fire Department',
      avatar: 'https://img.icons8.com/color/96/firefighter.png',
      department: 'Fire',
      status: 'offline',
      lastMessage: 'All clear for the fire alarm test',
      unread: 0,
      messages: [
        {
          sender: 'Fire Department',
          text: 'All clear for the fire alarm test today',
          time: '2025-03-04T14:20:00Z',
          isMe: false,
        },
      ],
    },
    {
      id: 4,
      name: 'Officer Sarah',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      department: 'Security',
      status: 'online',
      lastMessage: 'Patrolling the east campus area',
      unread: 0,
      messages: [
        {
          sender: 'Officer Sarah',
          text: 'Patrolling the east campus area',
          time: '2025-03-05T07:15:00Z',
          isMe: false,
        },
      ],
    },
    // Added two new officers
    {
      id: 5,
      name: 'Officer Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      department: 'Security',
      status: 'online',
      lastMessage: 'Stationed at the main entrance',
      unread: 1,
      messages: [
        {
          sender: 'Officer Rodriguez',
          text: 'I\'m stationed at the main entrance gate. All quiet here.',
          time: '2025-03-05T11:20:00Z',
          isMe: false,
        },
        {
          sender: 'Officer Rodriguez',
          text: 'There\'s a scheduled delivery arriving at 2pm, just to let you know.',
          time: '2025-03-05T11:22:00Z',
          isMe: false,
        },
      ],
    },
    {
      id: 6,
      name: 'Officer Patel',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      department: 'Security',
      status: 'online',
      lastMessage: 'Monitoring cameras at student center',
      unread: 0,
      messages: [
        {
          sender: 'You',
          text: 'Any update on the student center cameras?',
          time: '2025-03-05T10:05:00Z',
          isMe: true,
        },
        {
          sender: 'Officer Patel',
          text: 'All cameras operational. Currently monitoring the student center area.',
          time: '2025-03-05T10:07:00Z',
          isMe: false,
        },
      ],
    },
    {
      id: 7,
      name: 'Officer David',
      avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
      department: 'Security',
      status: 'online',
      lastMessage: 'Good morning Sir.',
      unread: 0,
      messages: [
        {
          sender: 'You',
          text: 'Any update on the morning patrol?',
          time: '2025-03-05T10:05:00Z',
          isMe: true,
        },
        {
          sender: 'Officer Patel',
          text: 'Currently patrolling the student center area.',
          time: '2025-03-05T10:07:00Z',
          isMe: false,
        },
      ],
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterTab, setFilterTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    // Mark all messages as read
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    setContacts(updatedContacts);
    setSelectedContact(contact);
    
    // Focus on message input after selecting contact
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 300);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedContact) return;

    const newMessage = {
      sender: 'You',
      text: currentMessage,
      time: new Date().toISOString(),
      isMe: true,
    };

    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          messages: [...contact.messages, newMessage],
          lastMessage: currentMessage,
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setSelectedContact({
      ...selectedContact,
      messages: [...selectedContact.messages, newMessage],
      lastMessage: currentMessage,
    });
    
    setCurrentMessage('');
    
    // Auto-scroll to bottom after sending
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event, newValue) => {
    setFilterTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter by both tab selection and search query
  const filteredContacts = contacts.filter(contact => {
    // First filter by department tab
    const departmentMatch = 
      filterTab === 0 || // All
      (filterTab === 1 && contact.department === 'Security') || // Security
      (filterTab === 2 && contact.department === 'Medical') || // Medical
      (filterTab === 3 && contact.department === 'Fire'); // Fire
    
    // Then filter by search query
    const searchMatch = searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return departmentMatch && searchMatch;
  });

  // Sort contacts by unread messages first, then by latest message
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    // First sort by unread messages
    if (a.unread > 0 && b.unread === 0) return -1;
    if (a.unread === 0 && b.unread > 0) return 1;
    
    // Then by latest message time
    const lastMessageA = a.messages[a.messages.length - 1].time;
    const lastMessageB = b.messages[b.messages.length - 1].time;
    return new Date(lastMessageB) - new Date(lastMessageA);
  });

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          height: 'calc(100vh - 100px)',
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          px: 1,
          width: 1350,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 1, pl: 1, display: 'flex', alignItems: 'center' }}>
          <SecurityIcon sx={{ mr: 2, fontSize: '2.2rem', color: theme.palette.primary.main }} />
          Communications Center
        </Typography>
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          overflow: 'hidden',
        }}>
          <Paper sx={{ 
            display: 'flex', 
            width: '100%',
            height: '100%', 
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            borderRadius: 3,
            background: 'linear-gradient(to right, #f5f7fa, #ffffff)',
          }}>
            {/* Contacts List - left panel */}
            <Box sx={{ 
              width: 480, 
              borderRight: '1px solid rgba(0,0,0,0.08)', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff',
            }}>
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: 'background.paper',
              }}>
                <TextField
                  fullWidth
                  placeholder="Search contacts..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.6rem' }} />
                      </InputAdornment>
                    ),
                    style: { 
                      fontSize: '1.25rem', 
                      padding: '12px 14px',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      borderRadius: '12px',
                    }
                  }}
                  sx={{ 
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      },
                      '& fieldset': {
                        borderColor: 'rgba(0,0,0,0.08)',
                      },
                    }
                  }}
                />
                <Tabs
                  value={filterTab}
                  onChange={handleFilterChange}
                  variant="fullWidth"
                  sx={{ 
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '3px 3px 0 0',
                    }
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: theme.palette.primary.main,
                    }
                  }}
                >
                  <Tab 
                    label="All" 
                    icon={<FilterListIcon />} 
                    iconPosition="start"
                    sx={{ fontSize: '1.15rem' }}
                  />
                  <Tab 
                    label="Security" 
                    icon={<SecurityIcon />} 
                    iconPosition="start"
                    sx={{ fontSize: '1.15rem' }}
                  />
                  <Tab 
                    label="Medical" 
                    icon={<LocalHospitalIcon />} 
                    iconPosition="start"
                    sx={{ fontSize: '1.15rem' }}
                  />
                  <Tab 
                    label="Fire" 
                    icon={<LocalFireDepartmentIcon />} 
                    iconPosition="start"
                    sx={{ fontSize: '1.15rem' }}
                  />
                </Tabs>
              </Box>
              
              {/* Contact count indicator */}
              <Box sx={{ px: 3, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  {sortedContacts.length} {sortedContacts.length === 1 ? 'contact' : 'contacts'} 
                  {searchQuery && ' matching your search'}
                </Typography>
              </Box>
              
              <List sx={{ 
  overflow: 'auto', 
  flexGrow: 1,
  backgroundColor: 'rgba(248, 249, 250, 0.5)',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none'
}}>
                {sortedContacts.length > 0 ? (
                  sortedContacts.map((contact) => (
                    <ListItem
                      button
                      key={contact.id}
                      selected={selectedContact?.id === contact.id}
                      onClick={() => handleContactSelect(contact)}
                      sx={{
                        py: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.03)',
                        transition: 'all 0.2s ease-in-out',
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(0, 85, 165, 0.08)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 85, 165, 0.05)',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <StatusBadge status={contact.status} unread={contact.unread}>
                          <Avatar 
                            src={contact.avatar} 
                            alt={contact.name}
                            sx={{ 
                              width: 60, 
                              height: 60,
                              border: '2px solid #fff',
                            }}
                          >
                            {contact.name.charAt(0)}
                          </Avatar>
                        </StatusBadge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography 
                              variant="subtitle2" 
                              sx={{ 
                                fontSize: '1.3rem',
                                fontWeight: contact.unread > 0 ? 600 : 500,
                              }}
                            >
                              {contact.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: contact.unread > 0 ? 'primary.main' : 'text.secondary', 
                                fontSize: '0.95rem',
                                fontWeight: contact.unread > 0 ? 600 : 400,
                              }}
                            >
                              {format(new Date(contact.messages[contact.messages.length - 1].time), 'h:mm a')}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Chip 
                                label={contact.department} 
                                size="small"
                                color={
                                  contact.department === 'Security' ? 'primary' :
                                  contact.department === 'Medical' ? 'info' : 'error'
                                }
                                sx={{ 
                                  height: 24, 
                                  fontSize: '0.85rem',
                                  fontWeight: 500,
                                  mr: 1,
                                }}
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              color={contact.unread > 0 ? 'text.primary' : 'text.secondary'}
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                mt: 0.7,
                                fontSize: '1.1rem',
                                fontWeight: contact.unread > 0 ? 500 : 400,
                              }}
                            >
                              {contact.lastMessage}
                            </Typography>
                          </>
                        }
                        sx={{ ml: 1.5 }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary" sx={{ fontSize: '1.2rem' }}>
                      No contacts found matching your criteria
                    </Typography>
                  </Box>
                )}
              </List>
            </Box>

            {/* Chat Area - right panel */}
            {selectedContact ? (
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                overflow: 'hidden',
                backgroundColor: '#fafbfc',
              }}>
                {/* Chat Header */}
                <Box
                  sx={{
                    p: 3,
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StatusBadge status={selectedContact.status}>
                      <Avatar
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        sx={{ 
                          mr: 2.5, 
                          width: 65, 
                          height: 65,
                          border: '2px solid #fff',
                        }}
                      >
                        {selectedContact.name.charAt(0)}
                      </Avatar>
                    </StatusBadge>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontSize: '1.6rem' }}>
                        {selectedContact.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.8 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: selectedContact.status === 'online' ? '#4caf50' : '#bdbdbd',
                            mr: 1,
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ fontSize: '1.2rem' }}
                        >
                          {selectedContact.status === 'online' ? 'Online' : 'Offline'}
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1.5, height: '16px', alignSelf: 'center' }} />
                        <Chip 
                          label={selectedContact.department} 
                          size="small"
                          color={
                            selectedContact.department === 'Security' ? 'primary' :
                            selectedContact.department === 'Medical' ? 'info' : 'error'
                          }
                          sx={{ 
                            height: 24, 
                            fontSize: '0.9rem',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <IconButton 
                      color="primary" 
                      sx={{ 
                        mx: 0.8,
                        backgroundColor: 'rgba(0, 85, 165, 0.08)',
                        '&:hover': { backgroundColor: 'rgba(0, 85, 165, 0.15)' },
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <IconButton 
                      color="primary" 
                      sx={{ 
                        mx: 0.8,
                        backgroundColor: 'rgba(0, 85, 165, 0.08)',
                        '&:hover': { backgroundColor: 'rgba(0, 85, 165, 0.15)' },
                      }}
                    >
                      <VideocamIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <IconButton 
                      onClick={handleMenuOpen} 
                      sx={{ 
                        mx: 0.8,
                        color: 'text.secondary',
                      }}
                    >
                      <MoreVertIcon sx={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: { 
                          mt: 1.5,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                          borderRadius: 2,
                          minWidth: 220,
                        }
                      }}
                    >
                      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '1.2rem', py: 1.5 }}>
                        View Contact Info
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '1.2rem', py: 1.5 }}>
                        Mark as Important
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '1.2rem', py: 1.5 }}>
                        Add to Emergency Contacts
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '1.2rem', py: 1.5, color: theme.palette.error.main }}>
                        Clear Chat
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>

                {/* Messages */}
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    overflow: 'auto',
                    backgroundColor: 'rgba(248,249,250,0.7)',
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/subtle-white-feathers.png")',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                    },
                    scrollbarWidth: 'thin',
                  }}
                >
                  {/* Date grouping for messages */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 4,
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                  }}>
                    <Chip
                      label={format(new Date(selectedContact.messages[0].time), 'MMMM d, yyyy')}
                      sx={{ 
                        px: 1.5, 
                        py: 2.5, 
                        fontSize: '1.1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>

                  {selectedContact.messages.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent: message.isMe ? 'flex-end' : 'flex-start',
                        mb: 3.5,
                      }}
                    >
                      {!message.isMe && (
                        <Avatar 
                          src={selectedContact.avatar} 
                          alt={selectedContact.name}
                          sx={{ 
                            mr: 2, 
                            alignSelf: 'flex-end', 
                            width: 44, 
                            height: 44,
                            border: '2px solid #fff',
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          maxWidth: '70%',
                          p: 2.5,
                          borderRadius: message.isMe ? '18px 18px 0 18px' : '18px 18px 18px 0',
                          backgroundColor: message.isMe ? '#0055a5' : 'white',
                          color: message.isMe ? 'white' : 'inherit',
                          boxShadow: message.isMe 
                            ? '0 2px 8px rgba(0, 85, 165, 0.25)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.05)',
                          position: 'relative',
                          '&:hover': {
                            '& .message-time': {
                              opacity: 1,
                            }
                          }
                        }}
                      >

<Typography variant="body1" sx={{ fontSize: '1.3rem', lineHeight: 1.5 }}>
                          {message.text}
                        </Typography>
                        <Typography
                          className="message-time"
                          variant="caption"
                          sx={{
                            mt: 1.2,
                            display: 'block',
                            textAlign: 'right',
                            fontSize: '1rem',
                            color: message.isMe ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                            opacity: 0.8,
                            transition: 'opacity 0.2s ease',
                          }}
                        >
                          {format(new Date(message.time), 'h:mm a')}
                        </Typography>
                      </Box>
                      {message.isMe && (
                        <Avatar 
                          src="https://randomuser.me/api/portraits/men/85.jpg" 
                          alt="You"
                          sx={{ 
                            ml: 2, 
                            alignSelf: 'flex-end', 
                            width: 44, 
                            height: 44,
                            border: '2px solid #fff',
                          }}
                        />
                      )}
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box
                  sx={{
                    p: 2.5,
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    mr: 1.5, 
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    borderRadius: '50px',
                    p: 0.5,
                  }}>
                    <IconButton 
                      sx={{ 
                        color: 'text.secondary',
                      }}
                    >
                      <AttachFileIcon sx={{ fontSize: '1.7rem' }} />
                    </IconButton>
                    <IconButton 
                      sx={{ 
                        color: 'text.secondary',
                      }}
                    >
                      <ImageIcon sx={{ fontSize: '1.7rem' }} />
                    </IconButton>
                    <IconButton 
                      sx={{ 
                        color: 'text.secondary',
                      }}
                    >
                      <MicIcon sx={{ fontSize: '1.7rem' }} />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    variant="outlined"
                    size="medium"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    inputRef={messageInputRef}
                    InputProps={{
                      style: { 
                        fontSize: '1.3rem',
                        padding: '14px 16px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '12px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <EmojiEmotionsOutlinedIcon sx={{ fontSize: '1.7rem', color: 'text.secondary' }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        },
                        '& fieldset': {
                          borderColor: 'rgba(0,0,0,0.08)',
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                    sx={{ 
                      ml: 1.5, 
                      py: 1.7, 
                      px: 3, 
                      fontSize: '1.3rem', 
                      fontWeight: 500,
                      borderRadius: 2.5,
                      minWidth: '120px',
                      background: 'linear-gradient(45deg, #0055a5 30%, #0077cc 90%)',
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fafbfc',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/subtle-white-feathers.png")',
                }}
              >
                <img
                  src="https://img.icons8.com/bubbles/200/chat--v1.png"
                  alt="Select a conversation"
                  style={{ width: 300, height: 300, opacity: 0.8 }}
                />
                <Typography 
                  variant="h6" 
                  color="text.primary" 
                  sx={{ 
                    mt: 3, 
                    fontSize: '1.8rem',
                    maxWidth: '60%',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  Campus Communications Hub
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    mt: 2, 
                    fontSize: '1.3rem',
                    maxWidth: '60%',
                    textAlign: 'center',
                    lineHeight: 1.5,
                  }}
                >
                  Select a contact from the list to start a conversation with campus security and emergency services
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: 'rgba(0, 85, 165, 0.08)',
                    borderRadius: 2,
                    width: 150,
                  }}>
                    <SecurityIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main, mb: 1 }} />
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      Security
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                      4 officers online
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: 'rgba(3, 169, 244, 0.08)',
                    borderRadius: 2,
                    width: 150,
                  }}>
                    <LocalHospitalIcon sx={{ fontSize: '3rem', color: '#03a9f4', mb: 1 }} />
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      Medical
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                      Available 24/7
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: 'rgba(244, 67, 54, 0.08)',
                    borderRadius: 2,
                    width: 150,
                  }}>
                    <LocalFireDepartmentIcon sx={{ fontSize: '3rem', color: '#f44336', mb: 1 }} />
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      Fire Dept
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                      Emergency response
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Enhanced status badge with unread count indicator
function StatusBadge({ status, children, unread = 0 }) {
  return (
    <Box sx={{ position: 'relative' }}>
      {children}
      <Box
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: status === 'online' ? '#4caf50' : '#bdbdbd',
          border: '3px solid white',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
        }}
      />
      {unread > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#e53935',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '50%',
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            border: '2px solid white',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
          }}
        >
          {unread}
        </Box>
      )}
    </Box>
  );
}

export default ChatSystem;