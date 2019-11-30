import {createStackNavigator} from 'react-navigation-stack';
import {
  CameraScreen,
  ScanSuccessful,
  ScanUnsuccessful,
  FeedPerBarCode,
  ProductPictureCameraScreen,
  ContributionInformationScreen,
} from 'screens';

const CameraStack = createStackNavigator(
  {
    CameraScreen,
    ScanSuccessful,
    ScanUnsuccessful,
    FeedPerBarCode,
    ProductPictureCameraScreen,
    ContributionInformationScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'CameraScreen',
  },
);

export default CameraStack;
