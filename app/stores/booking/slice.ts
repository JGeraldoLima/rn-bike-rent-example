import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookBike } from '../../services/bikeApi';
import { BookingState } from './types';

const initialState: BookingState = {
  booking: null,
  bookingLoading: false,
  bookingError: null,
};

export const bookBikeThunk = createAsyncThunk(
  'booking/bookBike',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }) => {
    const response = await bookBike(bikeId, userId, startDate, endDate);
    return response.data;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBooking: (state) => {
      state.booking = null;
      state.bookingError = null;
      state.bookingLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookBikeThunk.pending, (state) => {
        state.bookingLoading = true;
        state.bookingError = null;
      })
      .addCase(bookBikeThunk.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.booking = action.payload;
      })
      .addCase(bookBikeThunk.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = action.error.message || 'Failed to book bike';
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer; 