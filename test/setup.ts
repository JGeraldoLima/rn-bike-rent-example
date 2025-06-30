// we always make sure 'react-native' gets included first
import 'react-native';

// libraries to mock
import './__mocks__/react-native-reanimated';

jest.useFakeTimers();
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  let __TEST__: any;
}

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
