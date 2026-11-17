/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer, { act } from 'react-test-renderer';

// Mock the complex dependencies for this specific test
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: () => null,
  }),
}));

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheetModalProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock the store
jest.mock('./stores/store', () => ({
  store: {
    getState: () => ({}),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

// Mock the navigation component
jest.mock('./navigation', () => ({
  Main: () => null,
}));

// Import App after mocks are set up
const App = require('./App').default;

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});
