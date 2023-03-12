/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Headline, Text} from 'react-native-paper';
import {Formik} from 'formik';
import {loginForm} from './LoginFormValidation';
import {show} from '../../redux/loading/loading.actions';
import {recoverPassword} from '../../redux/login/login.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import AuthService from '../../services/auth/AuthService';

const Login = props => {
  console.log('propsredux', props.loginState.isRecoveringPassword);
  const navigation = useNavigation();
  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  const navigateToHome = () => navigation.navigate('Calendar');
  const forgotEmailPassword = () => {
    props.recoverPassword();
  };

  useEffect(() => {
    if (props.loginState.isRecoveringPassword){
      props.showLoading();

      AuthService.recoverPassword();
    }
  }, [props.loginState.isRecoveringPassword]);

  const content = (
    <SafeAreaView style={styles.container} testID="search-page">
      <View style={styles.loginContainer}>
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
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={navigateToHome}
            validationSchema={loginForm}>
            {({
              handleSubmit,
              handleChange,
              setFieldTouched,
              touched,
              values,
              errors,
            }) => (
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
                {touched.email && errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}
                <TextInput
                  secureTextEntry={true}
                  mode="outlined"
                  testID="password-input"
                  style={{marginTop: 10}}
                  label="Password"
                  onChangeText={handleChange('password')}
                  onFocus={() => setFieldTouched('password')}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
                <Button
                  disabled={!values.email || errors.email}
                  style={styles.button}
                  uppercase={false}
                  onPress={forgotEmailPassword}>
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

const mapStateToProps = store => ({
  loadingState: store.loading,
  loginState: store.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      recoverPassword: recoverPassword,
      showLoading: show,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    color: 'red',
    marginTop: 3,
  },
});
