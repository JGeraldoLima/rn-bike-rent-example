import { configureStore } from '@reduxjs/toolkit';
import rentAmountReducer from './stores/rentAmount/slice';
import bookingReducer from './stores/booking/slice';
import returnBikeReducer from './stores/returnBike/slice';
import availableBikesReducer from './stores/availableBikes/slice';

export const store = configureStore({
  reducer: {
    rentAmount: rentAmountReducer,
    booking: bookingReducer,
    returnBike: returnBikeReducer,
    availableBikes: availableBikesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 