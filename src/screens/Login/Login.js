/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button, Headline, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setCredentials} from '../../redux/slices/authSlice';
import {useLoginMutation} from '../../redux/slices/authApiSlice';
import {Formik} from 'formik';
import {loginForm} from './LoginFormValidation'

export const Login = () => {
  // const userRef = useRef();
  // const errRef = useRef();
  // const [email, setEmail] = useState('');
  // const [pwd, setPwd] = useState('');
  // const [errMsg, setErrMsg] = useState('');
  const navigation = useNavigation();
  // const [login, {isLoading}] = useLoginMutation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setErrMsg('');
  // }, [email, pwd]);

  // const handleSubmit = async e => {
  //   // e.preventDefault();
  //   try {
  //     const userData = await login({user, pwd}).unwrap(); // unwrap response here to get the token that we send off in dispatch on 43
  //     dispatch(setCredentials({...userData, user}));
  //     setUser('');
  //     setPwd('');
  //     navigation.navigate('Dashboard');
  //   } catch (err) {
  //     if (!err?.response) {
  //       setErrMsg('No Server Response');
  //     } else if (err.response?.status === 400) {
  //       setErrMsg('Missing Username or Password');
  //     } else if (err.response?.status === 401) {
  //       setErrMsg('Unauthorized');
  //     } else {
  //       setErrMsg('Login Failed');
  //     }
  //   }
  // };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToHome = () => navigation.navigate('Calendar')

  const content = (
    // isLoading ? (
    //   <ActivityIndicator />
    // ) :
    <SafeAreaView style={styles.container} testID="search-page">
      <View style={styles.loginContainer}>
        {/* <Text ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
          {errMsg}
        </Text> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <Image source={require('../../assets/service-it.png')} />
        </View>
        <View>
          <Headline style={{alignSelf: 'center'}} testID="heading">
            ServiceIT Login
          </Headline>
        </View>
        <View>
          <Formik initialValues={{email: '', password: ''}} onSubmit={navigateToHome} validationSchema={loginForm}>
            {({handleSubmit, handleChange, setFieldTouched, touched, values, errors}) => (
              <>
                <TextInput
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  testID="email-input"
                  style={{marginTop: 10}}
                  label="E-mail"
                  onChangeText={handleChange('email')}
                  onFocus={() => setFieldTouched('email')}
                />
                {
                  touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null
                }
                <TextInput
                  secureTextEntry={true}
                  mode="outlined"
                  testID="password-input"
                  style={{marginTop: 10}}
                  label="Password"
                  onChangeText={handleChange('password')}
                  onFocus={() => setFieldTouched('password')}
                />
                {
                  touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null
                }
                <Button disabled={!values.email || errors.email} style={styles.button} uppercase={false}>
                  Forgot email/password
                </Button>
                <Button
                  testID="login-button"
                  style={{...styles.button, marginTop: 10}}
                  icon="account"
                  mode="contained"
                  onPress={handleSubmit}>
                  Log in
                </Button>
                <Button
                  testID="register-button"
                  style={styles.button}
                  icon="lock"
                  mode="outlined"
                  onPress={navigateToRegister}>
                  Sign up
                </Button>
              </>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );

  return content;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  error: {
    color: "red",
    marginTop: 3
  }
});
