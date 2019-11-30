import {createStackNavigator} from 'react-navigation-stack';
import {
  Feed,
  ProductPictureCameraScreen,
  ContributionInformationScreen,
} from 'screens';

const AllContributionsStack = createStackNavigator(
  {
    Feed,
    ProductPictureCameraScreen,
    ContributionInformationScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Feed',
  },
);

export default AllContributionsStack;
