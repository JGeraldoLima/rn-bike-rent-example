import { Bike } from '../../models/Bike';
import { ApiError } from '../types';

export interface AvailableBikesState {
  availableBikes: Bike[];
  availableBikesLoading: boolean;
  availableBikesError: ApiError | null;
} 