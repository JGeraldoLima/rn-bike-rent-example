import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: -100,
    zIndex: 999,
    width: width - 48,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingVertical: 15,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infoTitle: {
    marginBottom: 4,
    color: '#1B1B1B',
    fontFamily: 'Mont',
    fontWeight: '400',
  },
  infoData: {
    fontWeight: '800',
    color: '#1B1B1B',
    fontFamily: 'Mont',
  },
  separator: {
    borderWidth: 1,
    height: '100%',
    borderColor: '#EDEDED',
  },
});

export default styles;
