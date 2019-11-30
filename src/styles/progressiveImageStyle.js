import {StyleSheet} from 'react-native';

import {BORDER_RADIUS} from 'constants';

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    borderRadius: BORDER_RADIUS,
  },
});

export default styles;
