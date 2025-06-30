import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  leftContainer: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  leftTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Mont',
  },
  rightTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    fontFamily: 'Mont',
  },
  rightContainer: {
    marginTop: 9,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
});

export default styles;
