import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvailableBikes } from '../store/bikesSlice';
import { RootState, AppDispatch } from '../store';

const useBikes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bikes = useSelector((state: RootState) => state.bikes.availableBikes);
  const loading = useSelector((state: RootState) => state.bikes.loading);
  const error = useSelector((state: RootState) => state.bikes.error);

  useEffect(() => {
    dispatch(getAvailableBikes());
  }, [dispatch]);

  console.log('useBikes hook: Current state:', { 
    bikesCount: bikes.length, 
    loading, 
    error 
  });

  return { data: bikes, isLoading: loading, error };
};

export default useBikes;
