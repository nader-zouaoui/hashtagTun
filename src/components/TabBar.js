import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import posed from 'react-native-pose';
import {useTheme} from 'hooks';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {dimensions} from 'helpers';
import {useDarkModeContext} from 'react-native-dark-mode';

const tabWidth = (dimensions.vw * 100) / 3;

const SpotLight = posed.View({
  route0: {x: 0},
  route1: {x: tabWidth},
  route2: {x: tabWidth * 2},
});

const Scaler = posed.View({
  active: {scale: 1.25},
  inactive: {scale: 1},
});

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 2,
    alignItems: 'center',
    ...ifIphoneX(
      {
        minHeight: 62 + 10,
        paddingBottom: 10,
      },
      {
        minHeight: 52 + dimensions.navBarHeight,

        paddingBottom: dimensions.navBarHeight,
      },
    ),
  },
  tabButton: {flex: 1},
  spotLight: {
    width: tabWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spotLightInner: {
    width: 48,
    height: 48,

    borderRadius: 24,
  },
  scaler: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
const TabBar = props => {
  const {
    renderIcon,

    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const theme = useTheme();
  const mode = useDarkModeContext();

  const {routes, index: activeRouteIndex} = navigation.state;

  const checkIfUnsucuccessful = () => {
    if (navigation.state.routes[activeRouteIndex].routes) {
      if (navigation.state.routes[activeRouteIndex].routes.length === 2) {
        return (
          navigation.state.routes[activeRouteIndex].routes[1].routeName ===
          'ScanUnsuccessful'
        );
      }
    }
    return false;
  };

  const checkIfSucuccessful = () => {
    if (navigation.state.routes[activeRouteIndex].routes) {
      if (navigation.state.routes[activeRouteIndex].routes.length === 2) {
        return (
          navigation.state.routes[activeRouteIndex].routes[1].routeName ===
          'ScanSuccessful'
        );
      }
    }
    return false;
  };

  const _IsSuccessful = checkIfSucuccessful();
  const _IsUnsuccessful = checkIfUnsucuccessful();

  const customTabBarStyle = StyleSheet.create({
    tabBar: {
      backgroundColor:
        mode === 'dark'
          ? theme.background.level1
          : _IsSuccessful
          ? theme.secondary
          : _IsUnsuccessful
          ? theme.primary
          : theme.background.level1,
    },
    activeRoute: {
      color:
        mode === 'dark'
          ? theme.primary
          : _IsSuccessful
          ? theme.primary
          : _IsUnsuccessful
          ? theme.primary
          : theme.background.level1,
    },
    inactiveRoute: {
      color:
        mode === 'dark'
          ? theme.primary
          : _IsSuccessful
          ? theme.primary
          : _IsUnsuccessful
          ? theme.background.level1
          : theme.primaryVariant,
    },
    spotLight: {
      backgroundColor:
        mode === 'dark'
          ? theme.textPrimary
          : _IsSuccessful
          ? theme.background.level1
          : _IsUnsuccessful
          ? theme.background.level1
          : theme.primary,
    },
  });

  return (
    <View style={[S.container, {...customTabBarStyle.tabBar}]}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            ...ifIphoneX(
              {
                paddingBottom: 10,
              },
              {
                paddingBottom: dimensions.navBarHeight,
              },
            ),
          },
        ]}>
        <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`}>
          <View style={[S.spotLightInner, {...customTabBarStyle.spotLight}]} />
        </SpotLight>
      </View>

      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive
          ? customTabBarStyle.activeRoute.color
          : customTabBarStyle.inactiveRoute.color;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            <Scaler
              pose={isRouteActive ? 'active' : 'inactive'}
              style={S.scaler}>
              {renderIcon({route, focused: isRouteActive, tintColor})}
            </Scaler>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
