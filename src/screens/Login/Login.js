import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Text, Snackbar, useTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {loginForm} from './LoginFormValidation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setLoading, setError, clearError } from '../../redux/slices/authSlice';
import { setUserInfo } from '../../redux/slices/userSlice';

loginUrl = 'https://mygaragedoc.azurewebsites.net/api/user/login';

export default Login = props => {
  const theme = useTheme();
  const {navigation} = props;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error)
  // const [recoveryEmail, setRecoveryEmail] = useState('');

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  
  // useEffect(() => {
  //   if (props.loginState.isRecoveringPassword) {
  //     props.showLoading();
  //     AuthService.recoverPassword(recoveryEmail)
  //       .then(() => {
  //         props.recoverPasswordSuccess();
  //       })
  //       .catch(err => {
  //         props.recoverPasswordFail(err);
  //       });
  //   } else {
  //     props.hideLoading();
  //   }
  // }, [props.loginState.isRecoveringPassword]);


  const handleLogin = async ({email, password}) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(loginUrl, JSON.stringify({"UserName": email, "Password": password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      dispatch(setToken(res.data.token))
      // dispatch(setUserInfo(res.data.userDetails))
    } catch (err) {
      console.log('err', err)
      dispatch(setError('Failed to log in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // const forgotEmailPassword = email => {
  //   setRecoveryEmail(email);
  //   props.recoverPassword();
  // };

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
            onSubmit={handleLogin}
            validationSchema={loginForm}
            validateOnBlur
            >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              values,
              errors,
            }) => (
              <>
                <TextInput
                  mode="outlined"
                  autoCorrect={false}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  testID="email-input"
                  style={{marginTop: 10}}
                  label="E-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onFocus={() => setFieldTouched('email')}
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                <TextInput
                  secureTextEntry={true}
                  autoCorrect={false}
                  mode="outlined"
                  testID="password-input"
                  style={{marginTop: 10}}
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onFocus={() => setFieldTouched('password')}
                />
                {errors.password && <Text style={styles.error}>{errors.password}</Text>}
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
      {/* {props.loginState.isRecoveredPassword ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => {
            props.recoverPasswordReset();
          }}
          testID="recoverPasswordSuccess">
          Recovery email sent!
        </Snackbar>
      ) : null} */}
      {error ? (
        <Snackbar
          duration={5000}
          visible={true}
          onDismiss={() => dispatch(clearError(null))}
          testID="errorMessage">
          {error}
        </Snackbar>
      ) : null}
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
    color: 'red',
    marginTop: 3,
  },
});
