import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import alertService from '../../services/alertService';

const initialState = {
  alerts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all alerts
export const getAlerts = createAsyncThunk(
  'alerts/getAll',
  async (_, thunkAPI) => {
    try {
      return await alertService.getAlerts();
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new alert
export const createAlert = createAsyncThunk(
  'alerts/create',
  async (alertData, thunkAPI) => {
    try {
      return await alertService.createAlert(alertData);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete alert
export const deleteAlert = createAsyncThunk(
  'alerts/delete',
  async (alertId, thunkAPI) => {
    try {
      return await alertService.deleteAlert(alertId);
    } catch (error) {
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all alerts
      .addCase(getAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlerts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.alerts = action.payload;
      })
      .addCase(getAlerts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create alert
      .addCase(createAlert.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Add the new alert to the beginning of the array
        state.alerts = [action.payload, ...state.alerts];
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete alert
      .addCase(deleteAlert.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the deleted alert from the array
        state.alerts = state.alerts.filter(alert => alert.id !== action.payload.id);
      })
      .addCase(deleteAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = alertsSlice.actions;
export default alertsSlice.reducer;