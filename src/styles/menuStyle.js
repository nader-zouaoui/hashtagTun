import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

import {BORDER_RADIUS} from 'constants';

const {vh, vw} = dimensions;

const styles = StyleSheet.create({
  button: {
    minWidth: 20 * vw,
    minHeight: 7 * vh,
    maxWidth: 90 * vw,

    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal:"12.5%",
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    borderRadius: BORDER_RADIUS,
  },
  label: {
    marginBottom: 6,
    marginLeft: vw * 2,
    textAlign:'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
