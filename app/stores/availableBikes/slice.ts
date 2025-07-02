import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableBikes } from '../../services/bikeApi';
import { Bike } from '../../models/Bike';

interface AvailableBikesState {
  availableBikes: Bike[];
  availableBikesLoading: boolean;
  availableBikesError: string | null;
}

const initialState: AvailableBikesState = {
  availableBikes: [],
  availableBikesLoading: false,
  availableBikesError: null,
};

export const fetchAvailableBikesThunk = createAsyncThunk(
  'availableBikes/fetchAvailableBikes',
  async () => {
    const response = await fetchAvailableBikes();
    return response.data as Bike[];
  }
);

const availableBikesSlice = createSlice({
  name: 'availableBikes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableBikesThunk.pending, (state) => {
        state.availableBikesLoading = true;
        state.availableBikesError = null;
      })
      .addCase(fetchAvailableBikesThunk.fulfilled, (state, action) => {
        state.availableBikesLoading = false;
        state.availableBikes = action.payload;
      })
      .addCase(fetchAvailableBikesThunk.rejected, (state, action) => {
        state.availableBikesLoading = false;
        state.availableBikesError = action.error.message || 'Failed to fetch available bikes';
      });
  },
});

export default availableBikesSlice.reducer; 