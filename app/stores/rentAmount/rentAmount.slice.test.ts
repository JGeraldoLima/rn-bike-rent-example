import reducer, { fetchRentAmountThunk, clearRentAmount } from './slice';
import { RentAmountState } from './types';

const initialState: RentAmountState = {
  rentAmount: null,
  rentAmountLoading: false,
  rentAmountError: null,
  fee: null,
  totalAmount: null,
};

describe('rentAmount slice', () => {
  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchRentAmountThunk.pending', () => {
    const action = { type: fetchRentAmountThunk.pending.type };
    const state = reducer(initialState, action);
    expect(state.rentAmountLoading).toBe(true);
    expect(state.rentAmountError).toBeNull();
  });

  it('should handle fetchRentAmountThunk.fulfilled', () => {
    const payload = { rentAmount: 10, fee: 2, totalAmount: 12 };
    const action = { type: fetchRentAmountThunk.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state.rentAmountLoading).toBe(false);
    expect(state.rentAmount).toBe(10);
    expect(state.fee).toBe(2);
    expect(state.totalAmount).toBe(12);
  });

  it('should handle fetchRentAmountThunk.rejected', () => {
    const action = { type: fetchRentAmountThunk.rejected.type, error: { message: 'Error' } };
    const state = reducer(initialState, action);
    expect(state.rentAmountLoading).toBe(false);
    expect(state.rentAmountError).toBe('Error');
  });

  it('should handle clearRentAmount', () => {
    const modifiedState = { ...initialState, rentAmount: 5, fee: 1, totalAmount: 6, rentAmountError: 'err', rentAmountLoading: true };
    const state = reducer(modifiedState, clearRentAmount());
    expect(state).toEqual(initialState);
  });
}); 