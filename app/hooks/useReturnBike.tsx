import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnBikeThunk, clearReturnBike } from '../stores/returnBike/slice';
import { AppDispatch } from '../store';
import { ReturnBikeState } from '../stores/returnBike/types';

const useReturnBike = (bookingId: number | null, trigger: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const returnResult = useSelector((state: { returnBike: ReturnBikeState }) => state.returnBike.returnResult);
  const returnBikeLoading = useSelector((state: { returnBike: ReturnBikeState }) => state.returnBike.returnBikeLoading);
  const returnBikeError = useSelector((state: { returnBike: ReturnBikeState }) => state.returnBike.returnBikeError);

  useEffect(() => {
    if (trigger && bookingId) {
      dispatch(returnBikeThunk({ bookingId }));
    }
    if (!trigger) {
      dispatch(clearReturnBike());
    }
  }, [bookingId, trigger, dispatch]);

  return { returnResult, returnBikeLoading, returnBikeError };
};

export default useReturnBike; 