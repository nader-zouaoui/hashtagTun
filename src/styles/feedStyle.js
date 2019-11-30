import {StyleSheet} from 'react-native';
import {dimensions} from 'helpers';

const {vh, textPaddingTop} = dimensions;

const styles = StyleSheet.create({
  text: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    bottom: '50%',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerText: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: vh * 5,
  },
  contentContainer: {
    paddingTop: textPaddingTop + 30,
    minHeight: '100%',
  },
  flatList: {
    flex: 1,
    width: '90%',
  },
});

export default styles;
