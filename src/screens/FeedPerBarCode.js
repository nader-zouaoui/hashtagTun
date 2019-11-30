import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  FetchContributionsByBarcodeAction,
  FetchContributionsByBarcodeNextPageAction,
} from 'actions';
import {arrowStyle} from 'styles';
import {FloatingButton, ArrowSvg, FeedComponent} from 'components';
import {dimensions} from 'helpers';
import {NavigationService} from 'services';
import {strings} from '../constants';

import {useTheme} from 'hooks';

const {vw, vh} = dimensions;

const rotation = new Animated.Value(0.5);
const translateY = new Animated.Value(-20 * vh);

const spin = rotation.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

const FeedPerBarCode = props => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  const {contributionsByProductBarcode} = props.contributions;

  useEffect(() => {
    handleFeedLoading();
  }, []);

  useEffect(() => {
    if (!loading && !contributionsByProductBarcode.length) {
      animateArrow();
    }
  }, [loading, contributionsByProductBarcode]);

  const animateArrow = () => {
    setTimeout(() => {
      Animated.spring(translateY, {
        toValue: -2 * vh,
        friction: 5,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        rotateArrow();
      }, 200);
    }, 1000);
  };

  const rotateArrow = () => {
    Animated.spring(rotation, {
      toValue: 0.3,
      friction: 2,
      useNativeDriver: true,
    }).start();
  };

  const customArrowStyle = StyleSheet.create({
    arrow: {
      transform: [{rotate: spin}, {translateY}],
      bottom: 10 * vh,
      alignSelf: 'center',
      right: 35 * vw,
    },
  });

  const renderArrow = () => (
    <Animated.View
      style={[
        arrowStyle.arrowContainer,
        {
          ...customArrowStyle.arrow,
        },
      ]}>
      <ArrowSvg style={{...arrowStyle.arrow, color: theme.primary}} />
    </Animated.View>
  );

  const handleSubmit = () => {
    NavigationService.navigate('ProductPictureCameraScreen');
  };

  const handleFeedLoading = isFeedLoading => {
    setLoading(isFeedLoading);
  };

  const renderButton = () => (
    <FloatingButton iconName="add" handleSubmit={handleSubmit} />
  );

  return (
    <>
      <FeedComponent
        data={contributionsByProductBarcode}
        fetchFeedData={props.FetchContributionsByBarcodeAction}
        fetchFeedDataNextPage={props.FetchContributionsByBarcodeNextPageAction}
        loadingCallback={handleFeedLoading}
        headerText={
          contributionsByProductBarcode.length
            ? strings.barCodeFeedHeader
            : undefined
        }
        emptyText={strings.barCodeFeedEmpty}
      />
      {!contributionsByProductBarcode.length && loading === false
        ? renderArrow()
        : null}
      {loading === false ? renderButton() : null}
    </>
  );
};

const mapStateToProps = ({contributions}) => ({
  contributions,
});

export default connect(
  mapStateToProps,
  {
    FetchContributionsByBarcodeAction,
    FetchContributionsByBarcodeNextPageAction,
  },
)(FeedPerBarCode);
