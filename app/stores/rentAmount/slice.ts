import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { calculateRentAmount } from '../../services/bikeApi';
import { RentAmountState } from './types';

const initialState: RentAmountState = {
  rentAmount: null,
  rentAmountLoading: false,
  rentAmountError: null,
  fee: null,
  totalAmount: null,
};

export const fetchRentAmountThunk = createAsyncThunk(
  'rentAmount/fetchRentAmount',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }) => {
    const response = await calculateRentAmount(bikeId, userId, startDate, endDate);
    return response.data;
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
      })
      .addCase(fetchRentAmountThunk.rejected, (state, action) => {
        state.rentAmountLoading = false;
        state.rentAmountError = action.error.message || 'Failed to fetch rent amount';
      });
  },
});

export const { clearRentAmount } = rentAmountSlice.actions;
export default rentAmountSlice.reducer; 