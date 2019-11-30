import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {ViewContainer, Text} from 'components';
import {useTheme} from 'hooks';
import {strings} from 'constants';
import {loaderStyle} from 'styles';

const Loader = ({children}) => {
  const theme = useTheme();
  return (
    <ViewContainer>
      {children}
      <ActivityIndicator color={theme.primary} size="large" />
      <Text style={[loaderStyle.text, {color: theme.textPrimary}]}>
        {strings.loaderMessage}
      </Text>
    </ViewContainer>
  );
};

Loader.propTypes = {
  children: PropTypes.node,
};

export default Loader;
