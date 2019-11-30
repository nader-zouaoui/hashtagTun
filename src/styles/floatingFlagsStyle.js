import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

const {vw} = dimensions;

const styles = StyleSheet.create({
  flag: {
    // width: vw * 10,
    // height: vw * 10,
    fontSize: 35,
    position: 'absolute',
  },

  container: {
    position: 'absolute',
    width: '100%',
    bottom: -vw * 10,
    backgroundColor: 'green',
  },
});

export default styles;
