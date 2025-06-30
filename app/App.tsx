import React from 'react';
import { StatusBar } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Main } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <Main />
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </React.Fragment>
  );
}
