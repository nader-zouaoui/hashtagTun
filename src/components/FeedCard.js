/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import {View, ImageBackground, Image} from 'react-native';
import {isArabic, getImageUrl} from 'helpers';
import {feedCardStyle} from 'styles';
import {DislikeSvg, LikeSvg, ProgressiveImage, Text} from 'components';
import {useTheme} from 'hooks';
import {strings} from 'constants';
import {placeholder} from 'assets';

const THUMB_SIZE = 40;

const thumbStyle = {
  width: THUMB_SIZE,
  height: THUMB_SIZE,
};

function FeedCard({imageUrl, name, tounsi, price, place}) {
  const theme = useTheme();
  const isTextArabic = isArabic(name);

  const renderExtendedCardContent = () => (
    <>
      <View style={feedCardStyle.tounsiContainer}>
        {tounsi ? (
          <LikeSvg style={thumbStyle} />
        ) : (
          <DislikeSvg style={thumbStyle} />
        )}

        <Text
          style={[feedCardStyle.extendedCardText, {color: theme.textPrimary}]}>
          {tounsi ? strings.tunisian : strings.notTunisian}
        </Text>
      </View>
    </>
  );

  const renderImage = () => (
    <ProgressiveImage
      style={feedCardStyle.image}
      source={{
        uri: getImageUrl(imageUrl, 700, 700),
      }}
      thumbnailSource={{
        uri: getImageUrl(imageUrl, 50, 50),
      }}
    />
  );

  const renderPlaceHolder = () => (
    <Image source={placeholder} style={feedCardStyle.image} />
  );

  return (
    <View style={feedCardStyle.container}>
      <View style={feedCardStyle.card}>
        {imageUrl ? renderImage() : renderPlaceHolder()}
        <ImageBackground style={feedCardStyle.filter} />
        <View style={feedCardStyle.textContainer}>
          <Text
            style={[
              feedCardStyle.productName,
              {textAlign: isTextArabic ? 'right' : 'left'},
            ]}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: !isTextArabic ? 'row' : 'row-reverse',
              width: '100%',
            }}>
            <Text
              style={[
                feedCardStyle.locationName,
                {textAlign: isTextArabic ? 'right' : 'left'},
              ]}>
              {place}
            </Text>
            <Text
              style={[
                feedCardStyle.locationName,
                {
                  textAlign: !isTextArabic ? 'right' : 'left',
                },
              ]}>
              {price} {isTextArabic ? 'د.ت' : 'DT'}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          feedCardStyle.extendedCard,
          {backgroundColor: theme.background.level1},
        ]}>
        {renderExtendedCardContent()}
      </View>
    </View>
  );
}

FeedCard.propTypes = {
  imageUrl: PropTypes.string,
  productName: PropTypes.string,
  tounsi: PropTypes.bool,
  place: PropTypes.string,
};

export default FeedCard;
