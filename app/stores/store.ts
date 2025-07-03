import { configureStore } from '@reduxjs/toolkit';
import rentAmountReducer from './rentAmount/slice';
import bookingReducer from './booking/slice';
import returnBikeReducer from './returnBike/slice';
import availableBikesReducer from './availableBikes/slice';

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