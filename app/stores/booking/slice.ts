import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookBike } from '../../services/bikeApi';
import { BookingState, ApiError } from '../';

const initialState: BookingState = {
  booking: null,
  bookingLoading: false,
  bookingError: null,
};

export const bookBikeThunk = createAsyncThunk(
  'booking/bookBike',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const response = await bookBike(bikeId, userId, startDate, endDate);
      return response.data;
    } catch (error: any) {
      // Extract error details from the response
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      // Fallback for network errors or other issues
      return rejectWithValue({
        errorType: 'NetworkError',
        message: error.message || 'Failed to book bike'
      });
    }
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
        // Use the rejected value if available, otherwise create a fallback error
        if (action.payload) {
          state.bookingError = action.payload as ApiError;
        } else {
          state.bookingError = {
            errorType: 'UnknownError',
            message: action.error.message || 'Failed to book bike'
          };
        }
      });
  },
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer; 