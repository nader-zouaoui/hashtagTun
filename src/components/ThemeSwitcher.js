import React, {useEffect} from 'react';
import {Animated, TouchableOpacity, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {platformIcon, dimensions} from 'helpers';
import {useDarkModeContext} from 'react-native-dark-mode';

const {vw} = dimensions;

const rotation = new Animated.Value(0.6);

const ThemeSwitcher = () => {
  const {mode, toggleMode} = useDarkModeContext();

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    setTimeout(() => {
      Animated.spring(rotation, {
        toValue: 1,
        useNativeDriver: true,

        speed: 1,
      }).start(animateReverse);
    }, 5000);
  };

  const animateReverse = () => {
    setTimeout(() => {
      Animated.spring(rotation, {
        toValue: 0,
        useNativeDriver: true,

        speed: 1,
      }).start(animate);
    }, 5000);
  };
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 15 * vw,
        right: 5 * vw,
        transform: [{rotate: spin}],
      }}>
      <TouchableOpacity onPress={toggleMode}>
        <Icon
          name={platformIcon(mode === 'dark' ? 'sunny' : 'moon')}
          color={mode === 'dark' ? 'yellow' : 'black'}
          size={7 * vw}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ThemeSwitcher;
