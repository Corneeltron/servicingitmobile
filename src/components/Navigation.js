import React from 'react';
import { Appbar, useTheme, Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../redux/slices/authSlice';

function Navigation(props) {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header mode="center-aligned" elevated style={{backgroundColor: theme.colors.primary}}>
      {props.back ? <Appbar.BackAction size={18} color="#fff" onPress={props.navigation.goBack} /> : null }
      <Appbar.Content size={18} color="#fff" title="ServiceIT" titleStyle={{fontFamily: "Epilogue", fontWeight: 400}}/>
      {!props.back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={() => {console.log('Option 1 was pressed')}} title="Calendar" />
          <Menu.Item onPress={() => {console.log('Option 2 was pressed')}} title="Employee Info" />
          <Menu.Item onPress={() => dispatch(clearToken(null))} title="Logout" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default Navigation;