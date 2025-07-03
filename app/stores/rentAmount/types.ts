import { ApiError } from '../types';

export interface RentAmountState {
  rentAmount: number | null;
  rentAmountLoading: boolean;
  rentAmountError: ApiError | null;
  fee: number | null;
  totalAmount: number | null;
} 