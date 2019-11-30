import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View} from 'react-native';
import {textFieldStyle} from 'styles';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {platformIcon} from 'helpers';
import {useTheme} from 'hooks';
import {Text} from 'components';

const TextField = ({
  label,
  containerStyle,
  handleFocus,
  isRequired,
  ...props
}) => {
  const theme = useTheme();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setpasswordVisible(!passwordVisible);
  };
  const fieldRef = useRef(null);
  if (handleFocus) handleFocus(fieldRef);

  return (
    <View style={containerStyle}>
      <Text style={[textFieldStyle.label, {color: theme.textPrimary}]}>
        {label}{' '}
        {isRequired ? <Text style={{color: theme.primary}}>*</Text> : null}
      </Text>
      <TextInput
        {...props}
        ref={fieldRef}
        style={[
          textFieldStyle.textField,
          {
            color: theme.textPrimary,
            backgroundColor: theme.background.level1,
          },
        ]}
        placeholderTextColor={'grey'}
        secureTextEntry={props.isPassword ? !passwordVisible : false}
      />
      {props.isPassword ? (
        <IonicIcon
          name={platformIcon(passwordVisible ? 'eye-off' : 'eye')}
          size={20}
          style={[textFieldStyle.icon, {color: theme.textPrimary}]}
          onPress={togglePasswordVisibility}
        />
      ) : null}
    </View>
  );
};
TextInput.propTypes = {
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  isPassword: PropTypes.bool,
  containerStyle: PropTypes.object,
  handleFocus: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default TextField;
