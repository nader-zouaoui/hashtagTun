import {StyleSheet} from 'react-native';

import {dimensions} from 'helpers';
const {vmax, vmin} = dimensions;

const styles = StyleSheet.create({
  svg: {
    width: vmax * 30,
    height: vmax * 30,
    borderRadius: vmax * 15,
    elevation: 10,
    margin: vmin * 10,
    shadowColor: '#000',
    shadowOffset: {width: 7, height: 7},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 45,
    width: '100%',
    textAlign: 'center',
  },
});

export default styles;
