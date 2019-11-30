import {Platform} from 'react-native';

const platformIconName = iconName => {
  return Platform.OS === 'ios' ? 'ios-' + iconName : 'md-' + iconName;
};

export default platformIconName;
