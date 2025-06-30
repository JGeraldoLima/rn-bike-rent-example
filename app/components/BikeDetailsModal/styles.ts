import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  addressTitle: {
    marginTop: 14,
    marginBottom: 10,
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    fontFamily: 'Mont',
  },
  bikeDescription: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '400',
    lineHeight: 16.24,
    color: 'white',
    fontFamily: 'Mont',
  },
  bikeTitle: {
    marginBottom: 4,
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
    fontFamily: 'Mont',
  },
  bikeTypeContainer: {
    alignSelf: 'flex-start',
  },
  favoriteButton: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerContainer: {
    paddingTop: 18,
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F49D1',
  },
  headerContainer: {
    position: 'relative',
    height: 147,
    marginHorizontal: 24,
    marginBottom: 56,
    marginTop: 10,
  },
  mapContainer: {
    borderRadius: 20,
    width: '100%',
    height: 166,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  rentBikeButton: {
    flex: 4,
    marginLeft: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD775',
    borderRadius: 20,
  },
  rentBikeButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1B1B1B',
    fontFamily: 'Mont',
  },
  scrollView: {
    zIndex: -1,
    backgroundColor: '#1F49D1',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: height * 0.48,
  },
  scrollViewSubContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  separator: {
    opacity: 0.1,
    marginTop: 14,
    backgroundColor: '#D9D9D9',
    height: 1,
    width: '100%',
  },
});

export default styles;
