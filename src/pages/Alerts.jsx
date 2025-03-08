import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlerts, createAlert, deleteAlert, reset } from '../features/alerts/alertsSlice';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Container,
  IconButton,
  Tooltip,
  Dialog as ConfirmDialog,
  DialogContentText,
} from '@mui/material';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function Alerts() {
  const dispatch = useDispatch();
  const { alerts, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.alerts
  );

  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    severity: 'medium',
  });
  const [formError, setFormError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAlerts());
    
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && open) {
      handleClose();
    }

    if (isError) {
      setFormError(message);
    }
  }, [isSuccess, isError, message, open]);

  const handleClickOpen = () => {
    setOpen(true);
    setFormError('');
  };

  const handleClose = () => {
    setOpen(false);
    setFormError('');
    setAlertData({
      title: '',
      message: '',
      severity: 'medium',
    });
    dispatch(reset());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlertData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!alertData.title.trim()) {
      setFormError('Please enter an alert title');
      return;
    }
    
    if (!alertData.message.trim()) {
      setFormError('Please enter an alert message');
      return;
    }

    dispatch(createAlert(alertData));
  };

  const handleDeleteClick = (alert) => {
    setAlertToDelete(alert);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (alertToDelete) {
      dispatch(deleteAlert(alertToDelete.id));
      setDeleteDialogOpen(false);
      setAlertToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAlertToDelete(null);
  };

  const getSeverityChip = (severity) => {
    const severityColors = {
      high: 'error',
      medium: 'warning',
      low: 'info',
    };

    return (
      <Chip
        label={severity.charAt(0).toUpperCase() + severity.slice(1)}
        color={severityColors[severity]}
        size="medium"
        sx={{ fontSize: '1.5rem', height: '32px', '& .MuiChip-label': { px: 2 } }}
      />
    );
  };

  if (isLoading && alerts.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h3" component="h1" fontWeight="bold">
          Alerts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          size="large"
          sx={{ 
            fontSize: '1.1rem', 
            py: 1.5, 
            px: 3,
            borderRadius: 2
          }}
        >
          Create Alert
        </Button>
      </Box>

      {isError && !open && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <List sx={{ width: '100%' }}>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <ListItem
                key={alert.id}
                divider
                sx={{ 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  alignItems: { xs: 'flex-start', md: 'center' },
                  py: 3,
                  px: 3
                }}
                secondaryAction={
                  <Tooltip title="Delete Alert">
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteClick(alert)}
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h6" component="span" fontWeight="medium">
                        {alert.title}
                      </Typography>
                      {getSeverityChip(alert.severity)}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontSize: '1.52rem' }}>
                      {alert.message}
                    </Typography>
                  }
                  sx={{ flex: 1, pr: { md: 6 } }} // Make room for the delete button
                  disableTypography
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    ml: { xs: 0, md: 4 },
                    mt: { xs: 2, md: 6 },
                    fontSize: '1rem'
                  }}
                >
                  {format(new Date(alert.createdAt), 'MMM d, yyyy h:mm a')}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ py: 4 }}>
              <ListItemText 
                primary={
                  <Typography variant="h6" align="center">
                    No alerts available
                  </Typography>
                } 
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {/* Create Alert Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pt: 3, px: 4, typography: 'h5', fontWeight: 'bold' }}>
          Create New Alert
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 3, fontSize: '1rem' }}>
              {formError}
            </Alert>
          )}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={40} />
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Alert Title"
            fullWidth
            variant="outlined"
            value={alertData.title}
            onChange={handleChange}
            disabled={isLoading}
            sx={{ 
              mb: 3,
              '& .MuiInputBase-input': { fontSize: '1.1rem', py: 1.5 },
              '& .MuiInputLabel-root': { fontSize: '1.1rem' }
            }}
          />
          <TextField
            margin="dense"
            name="message"
            label="Alert Message"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
            value={alertData.message}
            onChange={handleChange}
            disabled={isLoading}
            sx={{ 
              mb: 3,
              '& .MuiInputBase-input': { fontSize: '1.1rem' },
              '& .MuiInputLabel-root': { fontSize: '1.1rem' }
            }}
          />
          <FormControl fullWidth margin="dense" disabled={isLoading}>
            <InputLabel sx={{ fontSize: '1.1rem' }}>Severity</InputLabel>
            <Select
              name="severity"
              value={alertData.severity}
              label="Severity"
              onChange={handleChange}
              sx={{ 
                fontSize: '1.1rem',
                '& .MuiSelect-select': { py: 1.5 }
              }}
            >
              <MenuItem value="low" sx={{ fontSize: '1.1rem' }}>Low</MenuItem>
              <MenuItem value="medium" sx={{ fontSize: '1.1rem' }}>Medium</MenuItem>
              <MenuItem value="high" sx={{ fontSize: '1.1rem' }}>High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: 4, pb: 3, gap: 1 }}>
          <Button 
            onClick={handleClose} 
            sx={{ fontSize: '1rem', px: 3, py: 1 }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{ fontSize: '1rem', px: 3, py: 1 }}
            disabled={isLoading}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: { borderRadius: 2, p: 1 }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pt: 2, px: 3 }}>
          {"Delete Alert?"}
        </DialogTitle>
        <DialogContent sx={{ px: 3 }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this alert? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleDeleteCancel} sx={{ fontSize: '1rem' }}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            sx={{ fontSize: '1rem' }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </ConfirmDialog>
    </Container>
  );
}

export default Alerts;