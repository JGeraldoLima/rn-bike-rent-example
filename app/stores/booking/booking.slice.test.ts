import { configureStore } from '@reduxjs/toolkit';
import bookingReducer, { bookBikeThunk, clearBooking } from './slice';
import { BookingState, ApiError } from '../';

// Mock the API service
jest.mock('../../services/bikeApi', () => ({
  bookBike: jest.fn(),
}));

const { bookBike } = require('../../services/bikeApi');

describe('booking slice', () => {
  let store: ReturnType<typeof setupStore>;

  const setupStore = () => {
    return configureStore({
      reducer: {
        booking: bookingReducer,
      },
    });
  };

  beforeEach(() => {
    store = setupStore();
    jest.clearAllMocks();
  });

  describe('bookBikeThunk', () => {
    it('should handle successful booking', async () => {
      const mockResponse = {
        data: {
          bookingId: '123',
          status: 'confirmed',
        },
      };

      (bookBike as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(
        bookBikeThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().booking as BookingState;
      expect(state.booking).toEqual(mockResponse.data);
      expect(state.bookingLoading).toBe(false);
      expect(state.bookingError).toBe(null);
    });

    it('should handle API error with detailed error response', async () => {
      const mockError = {
        response: {
          data: {
            errorType: 'BikeAlreadyRentedError',
            message: 'This bike is already rented for the selected dates.',
          },
        },
      };

      (bookBike as jest.Mock).mockRejectedValue(mockError);

      await store.dispatch(
        bookBikeThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().booking as BookingState;
      expect(state.bookingLoading).toBe(false);
      expect(state.bookingError).toEqual({
        errorType: 'BikeAlreadyRentedError',
        message: 'This bike is already rented for the selected dates.',
      } as ApiError);
    });

    it('should handle network errors with fallback error', async () => {
      const mockError = new Error('Network error');

      (bookBike as jest.Mock).mockRejectedValue(mockError);

      await store.dispatch(
        bookBikeThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().booking as BookingState;
      expect(state.bookingLoading).toBe(false);
      expect(state.bookingError).toEqual({
        errorType: 'NetworkError',
        message: 'Network error',
      } as ApiError);
    });
  });

  describe('clearBooking', () => {
    it('should clear all booking data', () => {
      // First set some data
      store.dispatch(
        bookBikeThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      // Then clear it
      store.dispatch(clearBooking());

      const state = store.getState().booking as BookingState;
      expect(state.booking).toBe(null);
      expect(state.bookingError).toBe(null);
      expect(state.bookingLoading).toBe(false);
    });
  });
}); 