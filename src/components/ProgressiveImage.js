import React from 'react';
import {View, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {progressiveImageStyle} from 'styles';
import {useTheme} from 'hooks';

const ProgressiveImage = ({thumbnailSource, source, style, ...props}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        progressiveImageStyle.container,
        {backgroundColor: theme.background.level1},
      ]}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        blurRadius={1}
        style={style}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[progressiveImageStyle.imageOverlay, style]}
      />
    </View>
  );
};

ProgressiveImage.propTypes = {
  thumbnailSource: PropTypes.object,
  source: PropTypes.object,
  style: PropTypes.object,
};

export default ProgressiveImage;
