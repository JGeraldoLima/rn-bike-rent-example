import { configureStore } from '@reduxjs/toolkit';
import rentAmountReducer, { fetchRentAmountThunk, clearRentAmount } from './slice';
import { RentAmountState, ApiError } from '../';

// Mock the API service
jest.mock('../../services/bikeApi', () => ({
  calculateRentAmount: jest.fn(),
}));

const { calculateRentAmount } = require('../../services/bikeApi');

describe('rentAmount slice', () => {
  let store: ReturnType<typeof setupStore>;

  const setupStore = () => {
    return configureStore({
      reducer: {
        rentAmount: rentAmountReducer,
      },
    });
  };

  beforeEach(() => {
    store = setupStore();
    jest.clearAllMocks();
  });

  describe('fetchRentAmountThunk', () => {
    it('should handle successful API response', async () => {
      const mockResponse = {
        data: {
          rentAmount: 50.0,
          fee: 5.0,
          totalAmount: 55.0,
        },
      };

      (calculateRentAmount as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(
        fetchRentAmountThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().rentAmount as RentAmountState;
      expect(state.rentAmount).toBe(50.0);
      expect(state.fee).toBe(5.0);
      expect(state.totalAmount).toBe(55.0);
      expect(state.rentAmountLoading).toBe(false);
      expect(state.rentAmountError).toBe(null);
    });

    it('should handle API error with detailed error response', async () => {
      const mockError = {
        response: {
          data: {
            errorType: 'UnavailableBikeError',
            message: 'Unavailable bike.',
          },
        },
      };

      (calculateRentAmount as jest.Mock).mockRejectedValue(mockError);

      await store.dispatch(
        fetchRentAmountThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().rentAmount as RentAmountState;
      expect(state.rentAmountLoading).toBe(false);
      expect(state.rentAmountError).toEqual({
        errorType: 'UnavailableBikeError',
        message: 'Unavailable bike.',
      } as ApiError);
    });

    it('should handle network errors with fallback error', async () => {
      const mockError = new Error('Network error');

      (calculateRentAmount as jest.Mock).mockRejectedValue(mockError);

      await store.dispatch(
        fetchRentAmountThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      const state = store.getState().rentAmount as RentAmountState;
      expect(state.rentAmountLoading).toBe(false);
      expect(state.rentAmountError).toEqual({
        errorType: 'NetworkError',
        message: 'Network error',
      } as ApiError);
    });
  });

  describe('clearRentAmount', () => {
    it('should clear all rent amount data', () => {
      // First set some data
      store.dispatch(
        fetchRentAmountThunk({
          bikeId: 1,
          userId: 1,
          startDate: '2024-01-01',
          endDate: '2024-01-02',
        })
      );

      // Then clear it
      store.dispatch(clearRentAmount());

      const state = store.getState().rentAmount as RentAmountState;
      expect(state.rentAmount).toBe(null);
      expect(state.fee).toBe(null);
      expect(state.totalAmount).toBe(null);
      expect(state.rentAmountError).toBe(null);
      expect(state.rentAmountLoading).toBe(false);
    });
  });
}); 