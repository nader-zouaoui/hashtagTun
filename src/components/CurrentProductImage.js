import React from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, View, Animated} from 'react-native';
import {feedCardStyle} from 'styles';
import {BarCodeSvg, Text} from 'components';

const CurrentProductImage = ({uri, barcode, style}) => {
  return (
    <Animated.View style={[feedCardStyle.card, {...style}]}>
      <ImageBackground source={{uri}} style={feedCardStyle.image}>
        <ImageBackground style={feedCardStyle.filter} />
        {barcode ? (
          <View
            style={[
              feedCardStyle.textContainer,
              {width: undefined, alignItems: 'center', marginTop: 10},
            ]}>
            <BarCodeSvg style={feedCardStyle.icon} />
            <Text style={[feedCardStyle.productName, {fontSize: 13}]}>
              {barcode}
            </Text>
          </View>
        ) : null}
      </ImageBackground>
    </Animated.View>
  );
};

CurrentProductImage.propTypes = {
  uri: PropTypes.string,
  barcode: PropTypes.string,
};

export default CurrentProductImage;
