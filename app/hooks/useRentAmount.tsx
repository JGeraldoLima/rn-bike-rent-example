import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentAmountThunk, clearRentAmount } from '../stores/rentAmount/slice';
import { AppDispatch } from '../stores/store';
import { RentAmountState } from '../stores/rentAmount/types';

const useRentAmount = (bikeId: number | null, userId: number | null, startDate: string | null, endDate: string | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const rentAmount = useSelector((state: { rentAmount: RentAmountState }) => state.rentAmount.rentAmount);
  const rentAmountLoading = useSelector((state: { rentAmount: RentAmountState }) => state.rentAmount.rentAmountLoading);
  const rentAmountError = useSelector((state: { rentAmount: RentAmountState }) => state.rentAmount.rentAmountError);
  const fee = useSelector((state: { rentAmount: RentAmountState }) => state.rentAmount.fee);
  const totalAmount = useSelector((state: { rentAmount: RentAmountState }) => state.rentAmount.totalAmount);

  useEffect(() => {
    if (bikeId != null && userId != null && startDate && endDate) {
      dispatch(fetchRentAmountThunk({ bikeId, userId, startDate, endDate }));
    } else {
      dispatch(clearRentAmount());
    }
  }, [bikeId, userId, startDate, endDate, dispatch]);

  return { rentAmount, rentAmountLoading, rentAmountError, fee, totalAmount };
};

export default useRentAmount; 