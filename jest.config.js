module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|@react-navigation" +
      "|react-native-reanimated" +
      "|react-native-gesture-handler" +
      "|@gorhom/bottom-sheet" +
      "|react-native-swiper-flatlist" +
      "|react-native-calendars" + 
      "|react-native-swipe-gestures" +
      "|react-redux" +
      "|@shopify/flash-list" +
      ")/)",
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  resolver: 'react-native/jest/resolver',
  setupFiles: [
    './jest.setup.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/index.{js,ts}',
  ],
  coverageReporters: ['text', 'lcov'],
};