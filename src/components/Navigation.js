import React from 'react';
import { Appbar, useTheme, Menu } from 'react-native-paper';
import { connect } from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import { logout } from '../redux/login/login.actions';

function Navigation(props) {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
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
          <Menu.Item onPress={() => props.logout()} title="Logout" />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

const mapStateToProps = store => ({
  loadingState: store.loading,
  loginState: store.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: logout
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);