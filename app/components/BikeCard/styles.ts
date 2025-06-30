import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 18,
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bikeImage: {
    width: 197,
    height: 112,
    marginBottom: 9,
    marginTop: 43,
  },
  bikeModelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  bikeModelText: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Mont',
    color: '#1B1B1B',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#EDEDED',
    marginVertical: 8,
  },
  bikeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  bikeTypeContainer: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    backgroundColor: '#FFD775',
  },
  bikeTypeText: {
    fontSize: 12,
  },
  bikePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikePriceText: {
    fontSize: 24,
    color: '#1B1B1B',
    fontWeight: '800',
    fontFamily: 'Mont',
  },
  bikeDayText: {
    fontSize: 16,
    color: '#1B1B1B',
    fontFamily: 'Mont',
    fontWeight: '400',
  },
});

export default styles;
