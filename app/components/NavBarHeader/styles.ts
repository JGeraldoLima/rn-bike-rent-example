import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    marginRight: 20,
  },
  header: {
    backgroundColor: '#1F49D1',
    height: 200,
    paddingHorizontal: 24,
    paddingTop: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 34,
    fontFamily: 'Mont',
  },
});

export default styles;
