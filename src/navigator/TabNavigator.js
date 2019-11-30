import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import {Contributions} from 'screens';
import CameraStack from './CameraStack';
import AllContributionsStack from './AllContributionsStack';
import {platformIcon, dimensions} from 'helpers';
import {TabBar} from 'components';

const {vw, vh} = dimensions;
const bottomTabIcons = {
  Feed: {
    name: platformIcon('basket'),
  },
  Caméra: {
    name: platformIcon('barcode'),
  },
  Contributions: {
    name: platformIcon('heart'),
  },
};

const BottomTabNavigator = createMaterialTopTabNavigator(
  {
    Feed: AllContributionsStack,
    Caméra: CameraStack,
    Contributions: Contributions,
  },
  {
    lazy: true,
    initialRouteName: 'Caméra',
    tabBarPosition: 'bottom',
    initialLayout: {
      width: vw * 100,
      height: vh * 100,
    },
    tabBarComponent: props => <TabBar {...props} />,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        var _navigation = navigation;
        var {routeName} = _navigation.state;
        var {name} = bottomTabIcons[routeName];

        return (
          <Icon
            name={name}
            style={{
              color: tintColor,
            }}
            size={23}
          />
        );
      },
    }),
  },
);

export default BottomTabNavigator;
