import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

const {vh, vw} = dimensions;

const styles = StyleSheet.create({
  textFieldContainer: {
    width: '80%',
    marginTop: vh * 3,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: vh * 5,
  },
});

export default styles;
