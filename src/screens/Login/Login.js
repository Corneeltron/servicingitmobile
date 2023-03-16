import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Snackbar, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {loginForm} from './LoginFormValidation';
import {hide, show} from '../../redux/loading/loading.actions';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordReset,
  recoverPasswordSuccess,
} from '../../redux/login/login.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import AuthService from '../../services/auth/authService';
import axios from 'axios';

loginUrl = 'https://mygaragedoc.azurewebsites.net/api/user/login';

const Login = props => {
  const theme = useTheme();
  const {navigation} = props;
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [userLogin, setUserLogin] = useState({email: '', password: ''});

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  
  useEffect(() => {
    if (props.loginState.isRecoveringPassword) {
      props.showLoading();
      AuthService.recoverPassword(recoveryEmail)
        .then(() => {
          props.recoverPasswordSuccess();
        })
        .catch(err => {
          props.recoverPasswordFail(err);
        });
    } else {
      props.hideLoading();
    }
  }, [props.loginState.isRecoveringPassword]);


  const authLogin = async (email, password) => {
    try {
      const res = await axios.post(loginUrl, JSON.stringify({"UserName": email, "Password": password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      console.log('res', res)
      props.loginSuccess(res);
    } catch (err) {
      console.log('err', err)
      props.loginFail(err)
    }
  };

  useEffect(() => {
    if (props.loginState.isLoggingIn) {
      props.showLoading();
      authLogin(userLogin.email, userLogin.password)
    } else {
      props.hideLoading();
    }
  }, [props.loginState.isLoggingIn]);

  const forgotEmailPassword = email => {
    setRecoveryEmail(email);
    props.recoverPassword();
  };

  const login = userLogin => {
    setUserLogin(userLogin);
    props.login();
  };

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
          <Text
            style={{ color: theme.colors.primary, fontFamily: 'Epilogue', fontWeight: 600, alignSelf: "center"}}
            variant="titleLarge"
            testID="heading">
            ServiceIT <Text style={{color: theme.colors.primary, fontWeight: 300}}>Login</Text>
          </Text>
        </View>
        <View>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={login}
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
                  onPress={() => forgotEmailPassword(values.email)}>
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
      {props.loginState.isRecoveredPassword ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => {
            props.recoverPasswordReset();
          }}
          testID="recoverPasswordSuccess">
          Recovery email sent!
        </Snackbar>
      ) : null}
      {props.loginState.error ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => {
            props.recoverPasswordReset();
          }}
          testID="errorMessage">
          {props.loginState.error.message}
        </Snackbar>
      ) : null}
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
      login: login,
      loginSuccess: loginSuccess,
      loginFail: loginFail,
      recoverPassword: recoverPassword,
      recoverPasswordFail: recoverPasswordFail,
      recoverPasswordSuccess: recoverPasswordSuccess,
      recoverPasswordReset: recoverPasswordReset,
      showLoading: show,
      hideLoading: hide,
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
