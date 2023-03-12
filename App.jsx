import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login/Login';
import {Register} from './src/screens/Register';
import {Dashboard} from './src/screens/Dashboard';
import {Calendar} from './src/screens/Calendar';
import {AgendaScreen} from './src/screens/Agenda';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import Loader from './src/components/Loader';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Login}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Calendar" component={AgendaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Loader />
    </PaperProvider>
    </Provider>
  );
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff"
  }
}
export default App;
