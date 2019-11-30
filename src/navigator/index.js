import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {SplashScreen, ScanUnsuccessful, ScanSuccessful, Feed} from 'screens';
import BottomTabNavigator from './TabNavigator';

const switchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    TabNavigator: BottomTabNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(switchNavigator);
