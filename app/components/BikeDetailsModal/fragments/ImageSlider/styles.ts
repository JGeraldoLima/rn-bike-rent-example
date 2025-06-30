import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  imgItem: {
    width: width - 48,
  },
  paginationContainer: {
    marginTop: 30,
  },
  paginationActiveItem: {
    marginHorizontal: 4,
    height: 8,
    width: 8,
    borderRadius: 16,
    backgroundColor: '#1B1B1B',
  },
  paginationInactiveItem: {
    marginHorizontal: 4,
    height: 8,
    width: 8,
    borderRadius: 16,
    backgroundColor: '#EDEDED',
  },
});

export default styles;
