import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableBikes, calculateRentAmount, bookBike } from '../services/bikeApi';
import { Bike } from '../models/Bike';

interface BikesState {
  bikes: Bike[];
  availableBikes: Bike[];
  rentAmount: number | null;
  fee: number | null;
  totalAmount: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: BikesState = {
  bikes: [],
  availableBikes: [],
  rentAmount: null,
  fee: null,
  totalAmount: null,
  loading: false,
  error: null,
};

//export const getAllBikes = createAsyncThunk('bikes/getBikes', async () => {
//  console.log('Redux: Starting getBikes thunk');
//  const response = await fetchAllBikes();
//  console.log('Redux: getBikes successful, data:', response.data);
//  return response.data as Bike[];
//});

export const getAvailableBikes = createAsyncThunk('bikes/getAvailableBikes', async () => {
  const response = await fetchAvailableBikes();
  return response.data as Bike[];
});

export const calculateRent = createAsyncThunk(
  'bikes/calculateRent',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }) => {
    const response = await calculateRentAmount(bikeId, userId, startDate, endDate);
    return response.data;
  }
);

export const rentBike = createAsyncThunk(
  'bikes/rentBike',
  async ({ bikeId, userId, startDate, endDate }: { bikeId: number; userId: number; startDate: string; endDate: string }, { dispatch }) => {
    console.log('Redux: Starting rentBike thunk');
    const response = await bookBike(bikeId, userId, startDate, endDate);
    console.log('Redux: rentBike successful, response:', response.data);
    
    // Refresh bikes lists after successful booking
    //dispatch(getAllBikes());
    dispatch(getAvailableBikes());
    
    return response.data;
  }
);

//export const returnRentedBike = createAsyncThunk(
//  'bikes/returnBike',
//  async ({ bikeId, userId }: { bikeId: number; userId: number }, { dispatch }) => {
//    console.log('Redux: Starting returnBike thunk');
//    const response = await returnBike(bikeId, userId);
//    console.log('Redux: returnBike successful, response:', response.data);
//    
    // Refresh bikes lists after successful return
//    dispatch(getAllBikes());
//    
//    return response.data;
//  }
//);

const bikesSlice = createSlice({
  name: 'bikes',
  initialState,
  reducers: {
    clearRentAmount: (state) => {
      state.rentAmount = null;
    },
    clearRentFee: (state) => {
      state.fee = null;
    },
    clearRentTotalAmount: (state) => {
      state.totalAmount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllBikes
      //.addCase(getAllBikes.pending, (state) => {
        //console.log('Redux: getBikes pending');
        //state.loading = true;
        //state.error = null;
      //})
      //.addCase(getAllBikes.fulfilled, (state, action) => {
        //console.log('Redux: getBikes fulfilled, bikes count:', action.payload.length);
        //state.loading = false;
        //state.bikes = action.payload;
      //})
      //.addCase(getAllBikes.rejected, (state, action) => {
        //console.error('Redux: getBikes rejected:', action.error.message);
        //state.loading = false;
        //state.error = action.error.message || 'Failed to fetch bikes';
      //})
      // getAvailableBikes
      .addCase(getAvailableBikes.pending, (state) => {
        console.log('Redux: getAvailableBikes pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableBikes.fulfilled, (state, action) => {
        console.log('Redux: getAvailableBikes fulfilled, bikes count:', action.payload.length);
        state.loading = false;
        state.availableBikes = action.payload;
      })
      .addCase(getAvailableBikes.rejected, (state, action) => {
        console.error('Redux: getAvailableBikes rejected:', action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch available bikes';
      })      
      // calculateRent
      .addCase(calculateRent.pending, (state) => {
        console.log('Redux: calculateRent pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateRent.fulfilled, (state, action) => {
        console.log('Redux: calculateRent fulfilled, amount:', action.payload);
        state.loading = false;
        state.rentAmount = action.payload.rentAmount;
        state.fee = action.payload.fee;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(calculateRent.rejected, (state, action) => {
        console.error('Redux: calculateRent rejected:', action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch rent amount';
      })
      // rentBike
      .addCase(rentBike.pending, (state) => {
        console.log('Redux: rentBike pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(rentBike.fulfilled, (state, action) => {
        console.log('Redux: rentBike fulfilled, response:', action.payload);
        state.loading = false;
      })
      .addCase(rentBike.rejected, (state, action) => {
        console.error('Redux: rentBike rejected:', action.error);
        state.loading = false;
        state.error = action.error.message || 'Failed to rent bike';
      })
      // returnBike
      //.addCase(returnRentedBike.pending, (state) => {
        //console.log('Redux: returnBike pending');
        //state.bookingLoading = true;
        //state.bookingError = null;
      //})
      //.addCase(returnRentedBike.fulfilled, (state, action) => {
        //console.log('Redux: returnBike fulfilled, response:', action.payload);
        //state.bookingLoading = false;
      //})
      //.addCase(returnRentedBike.rejected, (state, action) => {
        //console.error('Redux: returnBike rejected:', action.error.message);
        //state.bookingLoading = false;
        //state.bookingError = action.error.message || 'Failed to return bike';
      //});
  },
});

export const { clearRentAmount, clearBookingError, clearRentCalculation } = bikesSlice.actions;
export default bikesSlice.reducer; 