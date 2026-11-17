import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { returnBike } from '../../services/bikeApi'; // TODO: API not implemented yet
import { ReturnBikeState } from './types';

const initialState: ReturnBikeState = {
  returnResult: null,
  returnBikeLoading: false,
  returnBikeError: null,
};

// export const returnBikeThunk = createAsyncThunk(
//   'returnBike/returnBike',
//   async ({ bookingId }: { bookingId: number }) => {
//     // const response = await returnBike(bookingId);
//     // return response.data;
//     throw new Error('Return bike API not implemented');
//   }
// );

const returnBikeSlice = createSlice({
  name: 'returnBike',
  initialState,
  reducers: {
    clearReturnBike: (state) => {
      state.returnResult = null;
      state.returnBikeError = null;
      state.returnBikeLoading = false;
    },
  },
  // No extraReducers since API is not implemented
});

export const { clearReturnBike } = returnBikeSlice.actions;
export default returnBikeSlice.reducer; 