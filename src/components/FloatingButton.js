import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {platformIcon} from 'helpers';
import {useTheme} from 'hooks';
import {floatingButtonStyle} from 'styles';

const FloatingButton = ({
  handleSubmit,
  backgroundColor,
  iconColor,
  style,
  iconName,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[
        floatingButtonStyle.button,
        {
          ...style,
          backgroundColor: backgroundColor || theme.primary,
        },
      ]}
      onPress={handleSubmit}>
      <Icon
        name={platformIcon(iconName || 'checkmark')}
        style={[
          floatingButtonStyle.icon,
          {color: iconColor || theme.background.level0},
        ]}
      />
    </TouchableOpacity>
  );
};

FloatingButton.propTypes = {
  handleSubmit: PropTypes.func,
  backgroundColor: PropTypes.string,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
};

export default FloatingButton;
