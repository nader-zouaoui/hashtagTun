import React, {useEffect} from 'react';
import {Animated} from 'react-native';

import {afterScanStyle} from 'styles';
import {DislikeSvg, FloatingButton, ViewContainer, Text} from 'components';
import {NavigationService} from 'services';
import {useTheme} from 'hooks';
import {dimensions} from 'helpers';
import {strings} from 'constants';

const {vw, vh} = dimensions;

const ScanUnsuccessful = () => {
  const scale = new Animated.Value(2 / 3);
  const textOpacity = new Animated.Value(0);
  const translateX = new Animated.Value(-100 * vw);
  const buttonTranslateY = new Animated.Value(20 * vh);
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      startAnimations();
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      animateFloatingButton();
    }, 1000);
  }, [theme]);

  const animateFloatingButton = () => {
    Animated.spring(buttonTranslateY, {
      toValue: 0,
      friction: 6,

      useNativeDriver: true,
    }).start();
  };

  const startAnimations = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(textOpacity, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => animateFloatingButton());
  };

  const handleSubmit = () => {
    NavigationService.navigate('FeedPerBarCode');
  };

  return (
    <ViewContainer style={{backgroundColor: theme.primary}}>
      <Animated.View style={{transform: [{translateX}]}}>
        <DislikeSvg style={afterScanStyle.svg} />
      </Animated.View>
      <Text
        animated
        style={[
          afterScanStyle.text,
          {
            opacity: textOpacity,
            transform: [{scaleX: scale}, {scaleY: scale}],
            color: '#FFFFFF',
          },
        ]}>
        {strings.notTunisianExclamation}
      </Text>
      <FloatingButton
        style={{transform: [{translateY: buttonTranslateY}]}}
        iconColor={theme.primary}
        backgroundColor="#FFFFFF"
        handleSubmit={handleSubmit}
      />
    </ViewContainer>
  );
};

export default ScanUnsuccessful;
