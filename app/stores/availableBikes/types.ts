import { Bike } from '../../models/Bike';

export interface AvailableBikesState {
  availableBikes: Bike[];
  availableBikesLoading: boolean;
  availableBikesError: string | null;
} 