import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import incidentsReducer from '../features/incidents/incidentsSlice';
import alertsReducer from '../features/alerts/alertsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    incidents: incidentsReducer,
    alerts: alertsReducer,
    users: usersReducer,
  },
});