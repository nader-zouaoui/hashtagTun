import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {
  FetchContributionsAction,
  FetchContributionsNextPageAction,
} from 'actions';
import {FloatingButton, FeedComponent} from 'components';
import {NavigationService} from 'services';
import {strings} from '../constants';

const Feed = props => {
  const {allContributions} = props.contributions;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFeedLoading();
  }, []);

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
        data={allContributions}
        fetchFeedData={props.FetchContributionsAction}
        fetchFeedDataNextPage={props.FetchContributionsNextPageAction}
        headerText={strings.feedHeader}
        loadingCallback={handleFeedLoading}
      />
      {loading === false ? renderButton() : null}
    </>
  );
};

const mapStateToProps = ({contributions}) => ({
  contributions,
});

export default connect(
  mapStateToProps,
  {FetchContributionsAction, FetchContributionsNextPageAction},
)(Feed);
