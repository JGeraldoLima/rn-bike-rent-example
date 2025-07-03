import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import useRentAmount from './useRentAmount';
import * as slice from '../stores/rentAmount/slice';

const mockStore = configureStore([thunk]);

describe('useRentAmount', () => {
  it('should select rent amount state from Redux', () => {
    const initialState = {
      rentAmount: {
        rentAmount: 10,
        rentAmountLoading: false,
        rentAmountError: null,
        fee: 2,
        totalAmount: 12,
      },
    };
    const store = mockStore(initialState);
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useRentAmount(1, 1, '2023-01-01', '2023-01-02'), { wrapper });
    expect(result.current.rentAmount).toBe(10);
    expect(result.current.fee).toBe(2);
    expect(result.current.totalAmount).toBe(12);
    expect(result.current.rentAmountLoading).toBe(false);
    expect(result.current.rentAmountError).toBeNull();
  });

  it('should dispatch fetchRentAmountThunk when all params are provided', () => {
    const store = mockStore({ rentAmount: {} });
    const spy = jest.spyOn(slice, 'fetchRentAmountThunk');
    const wrapper = ({ children }: any) => <Provider store={store}>{children}</Provider>;
    renderHook(() => useRentAmount(1, 1, '2023-01-01', '2023-01-02'), { wrapper });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
}); 