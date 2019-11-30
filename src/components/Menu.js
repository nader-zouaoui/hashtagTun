import React, {useState, useEffect} from 'react';
import {TouchableOpacity, FlatList, View} from 'react-native';
import PropTypes from 'prop-types';
import MaterialMenu, {MenuItem} from 'react-native-material-menu';
import {menuStyle} from 'styles';
import {useTheme} from 'hooks';
import {dimensions} from 'helpers';
import {Text} from 'components';

const {vh} = dimensions;
const Menu = ({items, handleSelect, label, containerStyle, defaultValue}) => {
  const [value, setValue] = useState(defaultValue || items[0]);
  const theme = useTheme();

  useEffect(() => {
    handleSelect(value);
  }, []);

  let menu = null;

  const setMenuRef = ref => {
    menu = ref;
  };

  const hideMenu = () => {
    menu.hide();
  };

  const showMenu = () => {
    menu.show();
  };

  const handlePress = item => {
    setValue(item);
    handleSelect(item);
    hideMenu();
  };

  const renderMenuChildren = ({item}) => (
    <MenuItem
      style={{alignItems: 'flex-end'}}
      onPress={() => handlePress(item)}>
      <Text
        style={{
          color: theme.textPrimary,
        }}>
        {item}
      </Text>
    </MenuItem>
  );

  const renderMenuButton = () => (
    <>
      <Text style={[menuStyle.label, {color: theme.textPrimary}]}>{label}</Text>
      <TouchableOpacity
        onPress={showMenu}
        style={[menuStyle.button, {backgroundColor: theme.background.level1}]}>
        <Text style={{color: theme.textPrimary}}>▼ </Text>
        <Text style={{color: theme.textPrimary}}>{value} </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={containerStyle}>
      <MaterialMenu ref={setMenuRef} button={renderMenuButton()}>
        <FlatList
          data={items}
          style={{
            backgroundColor: theme.background.level1,
            borderRadius: 3,
            maxHeight: 28 * vh,
          }}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          renderItem={renderMenuChildren}
        />
      </MaterialMenu>
    </View>
  );
};

Menu.propTypes = {
  items: PropTypes.array,
  handleSelect: PropTypes.func,
  label: PropTypes.string,
  containerStyle: PropTypes.object,
  defaultValue: PropTypes.string,
};

export default Menu;
