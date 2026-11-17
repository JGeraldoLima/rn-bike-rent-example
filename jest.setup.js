jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
    FlingGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    ForceTouchGestureHandler: View,
    GestureHandlerRootView: View,
    Directions: {},
    State: {},
  };
});
jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheetModalProvider: ({ children }) => children,
}));
jest.mock('react-native/Libraries/Components/RefreshControl/RefreshControl', () => {
  const View = require('react-native').View;
  return View;
});

jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    FlashList: React.forwardRef((props, ref) => {
      return React.createElement(FlatList, { ...props, ref });
    }),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }) => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, props, children);
  },
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));