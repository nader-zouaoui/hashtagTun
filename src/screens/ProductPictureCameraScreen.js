import React, {useState} from 'react';
import {connect} from 'react-redux';

import {NavigationService} from 'services';
import {Camera} from 'components';
import {SetProductImageFile} from 'actions';
import {NavigationEvents} from 'react-navigation';

const ProductPictureCameraScreen = props => {
  const [isCameraReady, setIsCameraReady] = useState(true);

  const handlePictureTaken = ({uri, name, type}) => {
    props.SetProductImageFile({uri, name, type});
    NavigationService.navigate('ContributionInformationScreen');
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsCameraReady(false);
    }, 300);
  };
  const handleFocus = () => {
    setIsCameraReady(true);
  };

  return (
    <>
      <NavigationEvents onWillBlur={handleBlur} onDidFocus={handleFocus} />
      <Camera
        pictureMode
        handlePictureTaken={handlePictureTaken}
        isCameraReady={isCameraReady}
      />
    </>
  );
};

export default connect(
  null,
  {SetProductImageFile},
)(ProductPictureCameraScreen);
