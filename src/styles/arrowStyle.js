import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

const {vmax} = dimensions;

const arrowSize = vmax * 13;

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: arrowSize,
    height: arrowSize,
  },
});

export default styles;
