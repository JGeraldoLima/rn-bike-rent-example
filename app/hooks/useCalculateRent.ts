import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { calculateRent, clearRentCalculation } from '../store/bikesSlice';

export const useCalculateRent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rentCalculation = useSelector((state: RootState) => state.bikes.rentCalculation);

  const calculate = (bikeId: number, userId: number, startDate: string, endDate: string) => {
    dispatch(calculateRent({ bikeId, userId, startDate, endDate }));
  };

  const clear = () => {
    dispatch(clearRentCalculation());
  };

  return { ...rentCalculation, calculate, clear };
}; 