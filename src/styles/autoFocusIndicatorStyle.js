import {StyleSheet} from 'react-native';

import {dimensions} from 'helpers';

const {vw} = dimensions;

const SIZE = 9 * vw;

const styles = StyleSheet.create({
  indicator: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    position: 'absolute',

    alignSelf: 'center',
  },
});

export default styles;
