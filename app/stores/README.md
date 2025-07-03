# Stores - Shared Types and Error Handling

This directory contains all Redux stores for the bike rental app, along with shared types and utilities.

## Shared Types

### `ApiError`
A standardized error interface used across all API endpoints:

```typescript
interface ApiError {
  errorType: string;  // e.g., "UnavailableBikeError", "NetworkError"
  message: string;    // Human-friendly error message
}
```

### `LoadingState`
A common interface for loading states:

```typescript
interface LoadingState {
  loading: boolean;
  error: ApiError | null;
}
```

### `ApiResponse<T>`
A generic interface for API responses:

```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
```

## Usage

### Importing Shared Types

```typescript
// Import from the stores index
import { ApiError, LoadingState, ApiResponse } from '@app/stores';

// Or import directly from types file
import { ApiError } from '@app/stores/types';
```

### Using in Store Types

```typescript
import { ApiError } from '../types';

export interface MyStoreState {
  data: any | null;
  loading: boolean;
  error: ApiError | null;  // Use ApiError instead of string
}
```

### Using in Async Thunks

```typescript
export const myAsyncThunk = createAsyncThunk(
  'myStore/myAction',
  async (params, { rejectWithValue }) => {
    try {
      const response = await apiCall(params);
      return response.data;
    } catch (error: any) {
      // Extract error details from the response
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      // Fallback for network errors
      return rejectWithValue({
        errorType: 'NetworkError',
        message: error.message || 'Failed to perform action'
      });
    }
  }
);
```

### Using in Reducers

```typescript
.addCase(myAsyncThunk.rejected, (state, action) => {
  state.loading = false;
  if (action.payload) {
    state.error = action.payload as ApiError;
  } else {
    state.error = {
      errorType: 'UnknownError',
      message: action.error.message || 'Unknown error occurred'
    };
  }
});
```

### Using in Components

```typescript
const { data, loading, error, getErrorMessage, getErrorType } = useMyHook();

if (error) {
  console.log('Error Type:', getErrorType());     // "UnavailableBikeError"
  console.log('Error Message:', getErrorMessage()); // "Unavailable bike."
}
```


## Benefits

1. **Consistency**: All stores use the same error structure
2. **Type Safety**: TypeScript ensures proper error handling
3. **Debugging**: Detailed error information for better debugging
4. **User Experience**: Better error messages for users
5. **Maintainability**: Centralized error handling logic