import React from 'react';
import {Animated} from 'react-native';
import {autoFocusIndicatorStyle} from 'styles';

const AutoFocusIndicator = ({style}) => {
  const size = autoFocusIndicatorStyle.indicator.width;
  const {opacity, left, top, transform} = style;
  return (
    <Animated.View
      style={[
        autoFocusIndicatorStyle.indicator,
        {
          opacity,
          left: left - size / 2,
          top: top - size / 2,
          borderColor: '#FFFFFF',
          transform,
        },
      ]}
    />
  );
};

export default AutoFocusIndicator;
