import React from 'react';
import { StatusBar } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './stores/store';

import { Main } from './navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Main />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </Provider>
    </React.Fragment>
  );
}
