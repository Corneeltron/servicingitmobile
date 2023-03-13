import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './src/components/Navigation';
import Login from './src/screens/Login/Login';
import {Register} from './src/screens/Register';
import AgendaScreen from './src/screens/Agenda';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {DefaultTheme} from 'react-native-paper';
import Loader from './src/components/Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import { hide } from './src/redux/loading/loading.actions';

const App = props => {
  const Stack = createStackNavigator();

  useEffect(() => {
    if (props.loginState.isLoggedIn) {
      props.hideLoading();
    }
    console.log('logged in!', props.loginState.isLoggedIn)
  }, [props.loginState.isLoggedIn]);

  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{header: (props) => <Navigation {...props} />}}>
            {props.loginState.isLoggedIn ? (
              <Stack.Screen name="Calendar" component={AgendaScreen} />
            ) : (
              <>
                <Stack.Screen
                  options={{headerShown: false}}
                  name="Login"
                  component={Login}
                />
                <Stack.Screen name="Register" component={Register} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <Loader />
      </PaperProvider>
  );
};


const mapStateToProps = store => ({
  loginState: store.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hideLoading: hide,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);