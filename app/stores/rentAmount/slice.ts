import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calculateRentAmount } from '../../services/bikeApi';
import { RentAmountState, ApiError } from '../';

const initialState: RentAmountState = {
  rentAmount: null,
  rentAmountLoading: false,
  rentAmountError: null,
  fee: null,
  totalAmount: null,
};

export const fetchRentAmountThunk = createAsyncThunk(
  'rentAmount/fetchRentAmount',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const response = await calculateRentAmount(bikeId, userId, startDate, endDate);
      return response.data;
    } catch (error: any) {
      // Extract error details from the response
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      // Fallback for network errors or other issues
      return rejectWithValue({
        errorType: 'NetworkError',
        message: error.message || 'Failed to fetch rent amount'
      });
    }
  }
);

const rentAmountSlice = createSlice({
  name: 'rentAmount',
  initialState,
  reducers: {
    clearRentAmount: (state) => {
      state.rentAmount = null;
      state.fee = null;
      state.totalAmount = null;
      state.rentAmountError = null;
      state.rentAmountLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRentAmountThunk.pending, (state) => {
        state.rentAmountLoading = true;
        state.rentAmountError = null;
      })
      .addCase(fetchRentAmountThunk.fulfilled, (state, action) => {
        state.rentAmountLoading = false;
        state.rentAmount = action.payload.rentAmount;
        state.fee = action.payload.fee;
        state.totalAmount = action.payload.totalAmount;
        state.rentAmountError = null;
      })
      .addCase(fetchRentAmountThunk.rejected, (state, action) => {
        state.rentAmountLoading = false;
        // Use the rejected value if available, otherwise create a fallback error
        if (action.payload) {
          state.rentAmountError = action.payload as ApiError;
        } else {
          state.rentAmountError = {
            errorType: 'UnknownError',
            message: action.error.message || 'Failed to fetch rent amount'
          };
        }
      });
  },
});

export const { clearRentAmount } = rentAmountSlice.actions;
export default rentAmountSlice.reducer; 