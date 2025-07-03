import { ApiError } from '../types';

export interface BookingState {
  booking: any | null;
  bookingLoading: boolean;
  bookingError: ApiError | null;
} 