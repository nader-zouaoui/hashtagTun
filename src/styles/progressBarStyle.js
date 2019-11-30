import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

const {vmin} = dimensions;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -vmin * 2,
  },
});

export default styles;
