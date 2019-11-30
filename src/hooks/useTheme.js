import colors from 'colors';
import {useDarkModeContext} from 'react-native-dark-mode';

const useTheme = () => {
  // const {mode} = useDarkModeContext();
  const mode = useDarkModeContext();

  return colors[mode];
};

export default useTheme;
