// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  FetchContributionsByUserAction,
  FetchContributionsByUserNextPageAction,
} from 'actions';
import {arrowStyle} from 'styles';
import {ArrowSvg, FeedComponent} from 'components';
import {dimensions} from 'helpers';
import {useTheme} from 'hooks';
import {strings} from '../constants';

const {vh, vw} = dimensions;
const translateY = new Animated.Value(20 * vh);

const Feed = props => {
  const theme = useTheme();

  const [loading, setLoading] = useState(true);

  const {contributionsByUser} = props.contributions;
  useEffect(() => {
    if (loading === false) {
      animateArrow();
    }
  }, [contributionsByUser, loading]);

  useEffect(() => {
    handleFeedLoading();
  }, []);

  const animateArrow = () => {
    setTimeout(() => {
      Animated.spring(translateY, {
        toValue: 3 * vh,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  const customArrowStyle = StyleSheet.create({
    arrow: {
      transform: [{translateY}, {rotate: '180deg'}],
      bottom: 7 * vh,
      alignSelf: 'center',
      right: 30 * vw,
    },
  });

  const handleFeedLoading = isFeedLoading => {
    setLoading(isFeedLoading);
  };

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

  return (
    <>
      <FeedComponent
        data={contributionsByUser}
        fetchFeedData={props.FetchContributionsByUserAction}
        fetchFeedDataNextPage={props.FetchContributionsByUserNextPageAction}
        headerText={
          contributionsByUser.length
            ? strings.userContributionsHeader
            : undefined
        }
        emptyText={
          !contributionsByUser.length
            ? strings.userContributionsEmpty
            : undefined
        }
        loadingCallback={handleFeedLoading}
      />
      {contributionsByUser.length ? null : renderArrow()}
    </>
  );
};

const mapStateToProps = ({contributions}) => ({
  contributions,
});

export default connect(
  mapStateToProps,
  {FetchContributionsByUserAction, FetchContributionsByUserNextPageAction},
)(Feed);
