import React, {useEffect} from 'react';
import RNSplashScreen from 'react-native-splash-screen';
import {NavigationService} from 'services';
import {connect} from 'react-redux';
import {onAppBootAction} from 'actions';

const SplashScreen = props => {
  useEffect(() => {
    onAppBoot();
  }, []);

  const onAppBoot = async () => {
    await props.onAppBootAction();

    NavigationService.navigate('TabNavigator');
    RNSplashScreen.hide();
  };

  return <></>;
};

export default connect(
  null,
  {onAppBootAction},
)(SplashScreen);
