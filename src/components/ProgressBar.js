import React from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {Bar} from 'components';
import {useTheme} from 'hooks';
import {progressBarStyle} from 'styles';
import {dimensions} from 'helpers';

const {vw} = dimensions;

const ProgressBar = ({uploadProgress, style}) => {
  const theme = useTheme();
  return (
    <Animated.View style={[style, {...progressBarStyle.container}]}>
      <Bar
        progress={uploadProgress}
        width={vw * 80}
        color={theme.primaryVariant}
        unfilledColor={theme.background.level0}
        useNativeDriver={true}
        animationConfig={{bounciness: 5}}
      />
    </Animated.View>
  );
};

ProgressBar.propTypes = {
  uploadProgress: PropTypes.number,
  style: PropTypes.object,
};

export default ProgressBar;
