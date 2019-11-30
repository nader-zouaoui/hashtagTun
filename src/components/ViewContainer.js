import React from 'react';
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';

import {appStyle} from 'styles';
import PropTypes from 'prop-types';
import {useTheme} from 'hooks';

const ViewContainer = ({children, hideKeyboard, style}) => {
  const theme = useTheme();
  if (hideKeyboard)
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible>
        <KeyboardAvoidingView
          style={[
            appStyle.container,
            {
              ...style,
              backgroundColor: style
                ? style.backgroundColor || theme.background.level0
                : theme.background.level0,
            },
          ]}
          behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  return (
    <SafeAreaView
      style={[
        appStyle.container,
        {
          ...style,
          backgroundColor: style
            ? style.backgroundColor || theme.background.level0
            : theme.background.level0,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
};

ViewContainer.propTypes = {
  children: PropTypes.node,
  hideKeyboard: PropTypes.bool,
  style: PropTypes.object,
};

export default ViewContainer;
