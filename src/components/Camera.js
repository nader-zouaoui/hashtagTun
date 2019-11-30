import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Animated,
  View,
  Text as RNText,
  StyleSheet,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  FloatingButton,
  AutoFocusIndicator,
  BarCodeSvg,
  Loader,
  Text,
} from 'components';
import {cameraStyle} from 'styles';
import {strings} from 'constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {platformIcon, dimensions} from 'helpers';

const {vh, vw} = dimensions;

const INIT_FOCUS_LOCATION = {
  x: 0.5,
  y: 0.5,
};

const INIT_INDICATOR_LOCATION = {
  x: 100,
  y: 100,
};
const opacity = new Animated.Value(0);
const scale = new Animated.Value(0.7);

const Camera = ({
  handleBarCodeRead,
  handlePictureTaken,
  pictureMode,
  isCameraReady,
  barcodeMode,
}) => {
  let camera;
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [isFlashModeOn, setIsFlashModeOn] = useState(false);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [autoFocusLocation, setAutoFocusLocation] = useState(
    INIT_FOCUS_LOCATION,
  );
  const [indicatorLocation, setIndicatorLocation] = useState(
    INIT_INDICATOR_LOCATION,
  );

  const takeAPicture = async () => {
    setIsPictureTaken(true);
    const options = {
      quality: 1,
      width: 1080,
      fixOrientation: true,
      pauseAfterCapture: true,
    };
    const data = await camera.takePictureAsync(options);
    const uri = data.uri;
    const array = uri.split('/Camera/');
    const name = array[1];

    const array2 = name.split('.');
    const extension = array2[1];
    const type = 'image/' + extension;
    handlePictureTaken({uri, name, type});
    setIsPictureTaken(false);
  };

  const handleEvent = event => {
    const {locationX, locationY} = event.nativeEvent;

    const x = locationX / width;
    const y = locationY / height;
    setIndicatorLocation({x: locationX, y: locationY});
    setAutoFocusLocation({x: y, y: -x + 1});
    showIndicator();
  };

  const handleLayout = event => {
    const {width: layoutWidth, height: layoutHeight} = event.nativeEvent.layout;
    setWidth(layoutWidth);
    setHeight(layoutHeight);
  };

  const toggleFlashMode = () => {
    setIsFlashModeOn(!isFlashModeOn);
  };

  const localStyles = StyleSheet.create({
    flashButton: {
      position: 'absolute',
      top: 7 * vh,
      right: 4 * vw,
      opacity: 0.7,
    },
  });

  const renderFlashmodeToggleButton = () => (
    <TouchableOpacity onPress={toggleFlashMode} style={localStyles.flashButton}>
      <Icon name={platformIcon('flashlight')} color="#FFF" size={8 * vw} />
    </TouchableOpacity>
  );
  const showIndicator = () => {
    Animated.parallel([
      Animated.spring(opacity, {
        friction: 4,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
        friction: 4,
      }),
    ]).start(hideIndicator);
  };

  const hideIndicator = () => {
    Animated.parallel([
      Animated.spring(opacity, {
        friction: 4,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 0.7,
        useNativeDriver: true,
        friction: 4,
      }),
    ]).start();
  };

  const renderAutofocusIndicator = () => (
    <AutoFocusIndicator
      style={{
        left: indicatorLocation.x,
        top: indicatorLocation.y,
        opacity,
        transform: [{scaleX: scale}, {scaleY: scale}],
      }}
    />
  );

  const renderBarCodeOverlay = () => (
    <>
      <View style={cameraStyle.textContainer}>
        <BarCodeSvg style={[cameraStyle.icon, {marginRight: -10}]} />
        <Text style={cameraStyle.text}>
          {strings.scanText}
          <RNText style={{color: 'transparent'}}>م </RNText>
        </Text>
      </View>
      <View style={cameraStyle.barcodeReader} accessible />
    </>
  );

  const renderCamera = () => {
    if (isCameraReady)
      return (
        <>
          <RNCamera
            ref={ref => {
              camera = ref;
            }}
            style={cameraStyle.camera}
            captureAudio={false}
            flashMode={
              isFlashModeOn
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: strings.cameraPermissionTitle,
              message: strings.cameraPermissionMessage,
              buttonPositive: strings.cameraPermissionPositive,
              buttonNegative: strings.cameraPermissionNegative,
            }}
            onBarCodeRead={handleBarCodeRead}
            barCodeTypes={[
              RNCamera.Constants.BarCodeType.ean13,
              RNCamera.Constants.BarCodeType.upc_e,
              RNCamera.Constants.BarCodeType.ean8,
            ]}
            autoFocusPointOfInterest={{
              ...autoFocusLocation,
              autoExposure: true,
            }}
            pendingAuthorizationView={<Loader />}
          />
          {renderAutofocusIndicator()}

          {barcodeMode ? renderBarCodeOverlay() : null}

          <TouchableOpacity
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            activeOpacity={1}
            onPress={handleEvent}
            onLayout={handleLayout}
          />
          {pictureMode ? (
            <FloatingButton
              handleSubmit={takeAPicture}
              disabled={isPictureTaken}
              iconName="camera"
            />
          ) : null}
          {renderFlashmodeToggleButton()}
        </>
      );

    return null;
  };

  return <>{renderCamera()}</>;
};

Camera.propTypes = {
  handleBarCodeRead: PropTypes.func,
  handlePictureTaken: PropTypes.func,
  pictureMode: PropTypes.bool,
  isCameraReady: PropTypes.bool,
  barcodeMode: PropTypes.bool,
};

export default Camera;
