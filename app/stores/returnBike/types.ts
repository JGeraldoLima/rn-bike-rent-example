import { ApiError } from '../types';

export interface ReturnBikeState {
  returnResult: any | null;
  returnBikeLoading: boolean;
  returnBikeError: ApiError | null;
} 