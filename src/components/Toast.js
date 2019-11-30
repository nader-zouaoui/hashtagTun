import React from 'react';
import PropTypes from 'prop-types';
import RootToast from 'react-native-root-toast';
import {useTheme} from 'hooks';

const Toast = ({message, visible}) => {
  const theme = useTheme();

  return (
    <RootToast
      visible={visible}
      shadow={true}
      animation={true}
      hideOnPress={true}
      position={90}
      backgroundColor={theme.primary}
      shadowColor="#FFFFFF"
      textColor="#FFFFFF">
      {message}
    </RootToast>
  );
};

Toast.propTypes = {
  message: PropTypes.string,
  visible: PropTypes.bool,
};

export default Toast;
