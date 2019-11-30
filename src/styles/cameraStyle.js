import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

import {BORDER_RADIUS} from '../constants';
const {vh, vw, vmax} = dimensions;

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',

    textAlign: 'center',
  },
  barcodeReader: {
    position: 'absolute',
    top: vh * 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    width: vw * 70,
    height: vh * 20,
    backgroundColor: 'grey',
    opacity: 0.4,
    alignSelf: 'center',
  },
  icon: {
    width: vmax * 5,
    height: vmax * 5,
  },
  textContainer: {
    top: vh * 20,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
