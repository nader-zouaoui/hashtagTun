import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import {feedStyle} from 'styles';
import {FeedCard, ViewContainer, Loader, Text} from 'components';
import {dimensions} from 'helpers';
import {useTheme} from 'hooks';
import {ITEMS_PER_PAGE} from '../constants';

const {vh} = dimensions;

const FeedComponent = ({
  fetchFeedData,
  fetchFeedDataNextPage,
  data,
  headerText,
  emptyText,
  loadingCallback,
}) => {
  const theme = useTheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timesRefreshed, setTimesRefreshed] = useState(1);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    setTimesRefreshed(1);

    await fetchFeedData();
    if (loading) {
      setLoading(false);
      if (loadingCallback) {
        loadingCallback(false);
      }
    }
  };

  const fetchNextPage = async () => {
    if (data.length >= ITEMS_PER_PAGE * timesRefreshed) {
      setIsRefreshing(true);
      setTimesRefreshed(timesRefreshed + 1);

      await fetchFeedDataNextPage();
      setIsRefreshing(false);
    }
  };

  const renderCards = ({item}) => {
    const tounsi = item.productBarcode
      ? item.productBarcode.slice(0, 3) === '619'
      : true;
    return <FeedCard {...item} tounsi={tounsi} />;
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchContributions();
    setIsRefreshing(false);
  };

  const renderFlatListHeader = () => (
    <Text style={[feedStyle.headerText, {color: theme.textPrimary}]}>
      {headerText}
    </Text>
  );

  const renderText = () => (
    <Text style={[feedStyle.text, {color: theme.textPrimary}]}>
      {emptyText}
    </Text>
  );
  if (loading) return <Loader />;

  return (
    <ViewContainer>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={feedStyle.contentContainer}
        renderItem={renderCards}
        style={feedStyle.flatList}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderFlatListHeader}
        ListEmptyComponent={renderText}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.primary, theme.primaryVariant]}
            tintColor="pink"
            progressViewOffset={vh * 5}
            progressBackgroundColor={theme.background.level1}
          />
        }
      />
    </ViewContainer>
  );
};

FeedComponent.propTypes = {
  fetchFeedData: PropTypes.func,
  fetchFeedDataNextPage: PropTypes.func,
  loadingCallback: PropTypes.func,
  data: PropTypes.array,
  headerText: PropTypes.string,
  emptyText: PropTypes.string,
};

export default FeedComponent;
