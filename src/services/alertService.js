import axios from 'axios';

const API_URL = 'http://localhost:5000/api/alerts';

// Mock data for development
const mockAlerts = [
  {
    id: '1',
    title: 'Campus Lockdown',
    message: 'Due to severe weather conditions, the campus is under lockdown. Stay indoors.',
    severity: 'high',
    createdAt: '2025-03-01T10:30:00Z',
  },
  {
    id: '2',
    title: 'Power Outage',
    message: 'There is a power outage in the science building. Maintenance has been notified.',
    severity: 'medium',
    createdAt: '2025-02-28T14:15:00Z',
  },
  {
    id: '3',
    title: 'Network Maintenance',
    message: 'The campus network will be down for maintenance from 2 AM to 4 AM tomorrow.',
    severity: 'low',
    createdAt: '2025-02-27T09:00:00Z',
  },
];

// Get all alerts
const getAlerts = async () => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return [...mockAlerts]; // Return a copy to avoid reference issues
  }

  const response = await axios.get(API_URL);
  return response.data;
};

// Create new alert
const createAlert = async (alertData) => {
  // For development, mock API call
  if (process.env.NODE_ENV === 'development') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAlert = {
      id: Date.now().toString(),
      ...alertData,
      createdAt: new Date().toISOString(),
    };
    
    // Add to mock data (this won't persist between page refreshes)
    mockAlerts.unshift(newAlert);
    
    return newAlert;
  }

  const response = await axios.post(API_URL, alertData);
  return response.data;
};

// Delete alert
const deleteAlert = async (alertId) => {
  // For development, mock API call
  if (process.env.NODE_ENV === 'development') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the index of the alert to be deleted
    const index = mockAlerts.findIndex(alert => alert.id === alertId);
    
    // Remove the alert if it exists
    if (index !== -1) {
      mockAlerts.splice(index, 1);
    }
    
    return { id: alertId };
  }

  await axios.delete(`${API_URL}/${alertId}`);
  return { id: alertId };
};

const alertService = {
  getAlerts,
  createAlert,
  deleteAlert
};

export default alertService;