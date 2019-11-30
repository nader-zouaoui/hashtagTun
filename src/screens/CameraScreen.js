import React, {useState, useEffect} from 'react';

import {Camera, ViewContainer} from 'components';

import {connect} from 'react-redux';
import {SetProductBarcode, CreateContributionAction} from 'actions';
import {NavigationService} from 'services';
import {NavigationEvents} from 'react-navigation';

const CameraScreen = props => {
  const [isCameraReady, setIsCameraReady] = useState(true);

  const handleBlur = () => {
    setTimeout(() => {
      setIsCameraReady(false);
    }, 300);
  };
  const handleFocus = () => {
    setIsCameraReady(true);
  };

  const onBarCodeRead = ({data, rawData, type, bounds}) => {
    props.SetProductBarcode(data);
    const tounsi = data.slice(0, 3) === '619';
    if (tounsi) {
      NavigationService.navigate('ScanSuccessful');
    } else {
      NavigationService.navigate('ScanUnsuccessful');
    }
  };

  //REDIRECT EMULATOR
  // useEffect(() => {
  //   NavigationService.navigate('ScanUnsuccessful');
  // }, []);

  return (
    <>
      <ViewContainer />
      <NavigationEvents onWillBlur={handleBlur} onDidFocus={handleFocus} />
      <Camera
        handleBarCodeRead={onBarCodeRead}
        isCameraReady={isCameraReady}
        barcodeMode
      />
    </>
  );
};

const mapStateToProps = ({barcode}) => ({
  barcode,
});

export default connect(
  mapStateToProps,
  {SetProductBarcode, CreateContributionAction},
)(CameraScreen);
