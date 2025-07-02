import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableBikesThunk } from '../stores/availableBikes/slice';
import { AppDispatch } from '../store';
import { AvailableBikesState } from '../stores/availableBikes/types';

const useAvailableBikes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const availableBikes = useSelector((state: { availableBikes: AvailableBikesState }) => state.availableBikes.availableBikes);
  const availableBikesLoading = useSelector((state: { availableBikes: AvailableBikesState }) => state.availableBikes.availableBikesLoading);
  const availableBikesError = useSelector((state: { availableBikes: AvailableBikesState }) => state.availableBikes.availableBikesError);

  useEffect(() => {
    dispatch(fetchAvailableBikesThunk());
  }, [dispatch]);

  const refresh = () => {
    dispatch(fetchAvailableBikesThunk());
  };

  return { data: availableBikes, isLoading: availableBikesLoading, error: availableBikesError, refresh };
};

export default useAvailableBikes; 