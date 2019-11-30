import React, {useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'components';
import {floatingFlagsStyle} from 'styles';
import {dimensions} from 'helpers';

const {vw} = dimensions;

const FloatingFlags = ({order}) => {
  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 80 * order);
  }, []);

  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  const right = (Math.floor(Math.random() * 90) + 1) * vw;
  const animate = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -1200,
        duration: 1800,
        easing: Easing.circle,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2500,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        floatingFlagsStyle.container,
        {opacity, transform: [{translateY}]},
      ]}>
      <Text style={[floatingFlagsStyle.flag, {right}]}>🇹🇳 </Text>
    </Animated.View>
  );
};

FloatingFlags.propTypes = {
  order: PropTypes.number,
};

export default FloatingFlags;
