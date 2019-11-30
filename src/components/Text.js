import React from 'react';
import {Animated, Text as RNText, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {DEFAULT_FONT} from '../constants';


const textStyles = StyleSheet.create(
  {
    text : {
      fontFamily : Platform.OS === 'android' ? DEFAULT_FONT : undefined
    }
  }
)
const Text = ({children, style, animated, ...props}) => {
  if (animated)
    return (
      <Animated.Text {...props} style={[style, {...textStyles.text}]}>
        {children}
      </Animated.Text>
    );
  return (
    <RNText {...props} style={[style, {...textStyles.text}]}>
      {children}
    </RNText>
  );
};

Text.propTypes = {
  animated: PropTypes.bool,
};

export default Text;
