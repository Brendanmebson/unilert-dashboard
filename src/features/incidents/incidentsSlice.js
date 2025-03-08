import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import incidentService from '../../services/incidentService';

const initialState = {
  incidents: [],
  incident: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all incidents
export const getIncidents = createAsyncThunk(
  'incidents/getAll',
  async (_, thunkAPI) => {
    try {
      return await incidentService.getIncidents();
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get incident by ID
export const getIncidentById = createAsyncThunk(
  'incidents/getById',
  async (id, thunkAPI) => {
    try {
      return await incidentService.getIncidentById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update incident status
export const updateIncidentStatus = createAsyncThunk(
  'incidents/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      return await incidentService.updateIncidentStatus(id, status);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const incidentsSlice = createSlice({
  name: 'incidents',
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
      .addCase(getIncidents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incidents = action.payload;
      })
      .addCase(getIncidents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncidentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncidentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incident = action.payload;
      })
      .addCase(getIncidentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateIncidentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIncidentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        // Update the incident in the incidents array
        const index = state.incidents.findIndex(inc => inc.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
        
        // Update the current incident detail if it matches
        if (state.incident && state.incident.id === action.payload.id) {
          state.incident = action.payload;
        }
      })
      .addCase(updateIncidentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = incidentsSlice.actions;
export default incidentsSlice.reducer;