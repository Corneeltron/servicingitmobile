import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './src/components/Navigation';
import Login from './src/screens/Login/Login';
import {Register} from './src/screens/Register';
import AgendaScreen from './src/screens/Agenda';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import Loader from './src/components/Loader';
import {useSelector} from 'react-redux';

const App = () => {
  const Stack = createStackNavigator();
  const token = useSelector((state) => state.authReducer.token);

  // useEffect(() => {
  //   //clear token depending on the server info. ask Elijah
  // }, [])

  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{header: (props) => <Navigation {...props} />}}>
            {token ? (
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

export default App;