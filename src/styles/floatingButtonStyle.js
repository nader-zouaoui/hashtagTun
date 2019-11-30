import {StyleSheet} from 'react-native';

import {dimensions} from 'helpers';
import {BUTTON_SIZE} from 'constants';
const {vh, vw, textPaddingTop} = dimensions;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: vw * 3,
    bottom: vh * 4,
    width: vh * BUTTON_SIZE,
    height: vh * BUTTON_SIZE,
    borderRadius: (vh * BUTTON_SIZE) / 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: BUTTON_SIZE * 4,
  },
});

export default styles;
