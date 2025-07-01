import { configureStore } from '@reduxjs/toolkit';
import bikesReducer from './store/bikesSlice';

export const store = configureStore({
  reducer: {
    bikes: bikesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 