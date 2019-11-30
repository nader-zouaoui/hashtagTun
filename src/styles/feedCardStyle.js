import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';
import {BORDER_RADIUS} from '../constants';

const {vh, vw, vmax} = dimensions;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  card: {
    maxHeight: vh * 30,
    maxWidth: vw * 90,
    minWidth: vw * 10,
    minHeight: vh * 10,
    width: '100%',
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  locationName: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    padding: '5%',
    width: '100%',
  },
  filter: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.3,
    position: 'absolute',
  },
  container: {
    marginBottom: '20%',
  },
  extendedCard: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '-20%',
    height: '45%',
    width: '70%',

    borderRadius: BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendedCardText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  extendedCardSubText: {
    fontSize: 16,
  },
  tounsiContainer: {
    alignItems: 'center',
  },
  icon: {
    width: vmax * 7,
    height: vmax * 7,
  },
});

export default styles;
