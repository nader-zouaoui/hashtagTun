import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';
import {BORDER_RADIUS} from 'constants';

const {vh, vw} = dimensions;

const styles = StyleSheet.create({
  textField: {
    minHeight: 7 * vh,
    minWidth: 10 * vw,
    maxWidth: 90 * vw,
    textAlign:"center",
    borderRadius: BORDER_RADIUS,
    fontSize:16,
    elevation: 2,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textFieldContainer: {
    width: '80%',
    marginTop: vh * 10,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    right: '5%',

    top: '25%',
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
