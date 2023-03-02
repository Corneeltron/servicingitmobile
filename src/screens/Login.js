/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button, Headline, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setCredentials} from '../redux/slices/authSlice';
import {useLoginMutation} from '../redux/slices/authApiSlice';

export const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigation = useNavigation();
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const userData = await login({user, pwd}).unwrap();
      dispatch(setCredentials({...userData, user}));
      setUser('');
      setPwd('');
      navigation.navigate('Dashboard');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const content = isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      testID="search-page">
      <Text ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
        {errMsg}
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <Image source={require('../assets/service-it.png')} />
      </View>
      <View>
        <Headline style={{alignSelf: 'center'}} testID="heading">
          ServiceIT Login
        </Headline>
      </View>
      <View>
        <TextInput
          mode="outlined"
          testID="username-input"
          style={{marginTop: 10}}
          label="Username"
          // onBlur={onBlur}
          onChangeText={user => setUser(user)}
          value={user}
        />
        <TextInput
          secureTextEntry={true}
          mode="outlined"
          testID="password-input"
          style={{marginTop: 10}}
          label="Password"
          // onBlur={onBlur}
          onChangeText={password => setPwd(password)}
          value={pwd}
        />
        <Button
          testID="login-button"
          style={styles.button}
          icon="account"
          mode="contained"
          onPress={() => handleSubmit()}>
          Log in
        </Button>
        <Button
          testID="register-button"
          style={styles.button}
          icon="lock"
          mode="outlined"
          onPress={() => navigateToRegister()}>
          Sign up
        </Button>
      </View>
    </SafeAreaView>
  );

  return content;
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});
