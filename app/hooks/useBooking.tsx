import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookBikeThunk, clearBooking } from '../stores/booking/slice';
import { AppDispatch } from '../store';
import { BookingState } from '../stores/booking/types';

const useBooking = (bikeId: number | null, userId: number | null, startDate: string | null, endDate: string | null, trigger: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const booking = useSelector((state: { booking: BookingState }) => state.booking.booking);
  const bookingLoading = useSelector((state: { booking: BookingState }) => state.booking.bookingLoading);
  const bookingError = useSelector((state: { booking: BookingState }) => state.booking.bookingError);

  useEffect(() => {
    if (trigger && bikeId != null && userId != null && startDate && endDate) {
      dispatch(bookBikeThunk({ bikeId, userId, startDate, endDate }));
    }
    // Optionally clear booking state when trigger is false
    if (!trigger) {
      dispatch(clearBooking());
    }
  }, [bikeId, userId, startDate, endDate, trigger, dispatch]);

  return { booking, bookingLoading, bookingError };
};

export default useBooking; 