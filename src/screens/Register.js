/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/slices/authSlice';

export const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, userInfo, error, success} = useSelector(state => state.auth);

  const {
    handleSubmit,
    register,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const submitForm = data => {
    // check if passwords match
    console.log('data', data);
    if (data.password !== data.passwordRepeat) {
      alert('Password mismatch');
    }
    dispatch(registerUser(data));
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      navigation.navigate('/login');
    }
    // redirect authenticated user to profile screen
    if (userInfo) {
      navigation.navigate('Dashboard');
    }
  }, [navigation, userInfo, success]);

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        height: '100%',
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
      }}
      testID="search-page">
      {/* {error && <View>{error}</View>} */}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            testID="username-input"
            style={{marginTop: 10}}
            label="Username"
            onBlur={onBlur}
            onChangeText={user => onChange(user)}
            value={value}
          />
        )}
        name="username"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode="outlined"
            testID="email-input"
            style={{marginTop: 10}}
            label="Email"
            onBlur={onBlur}
            onChangeText={user => onChange(user)}
            value={value}
          />
        )}
        name="email"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry={true}
            mode="outlined"
            testID="password-input"
            style={{marginTop: 10}}
            label="Password"
            onBlur={onBlur}
            onChangeText={password => onChange(password)}
            value={value}
          />
        )}
        name="password"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry={true}
            mode="outlined"
            testID="password-input"
            style={{marginTop: 10}}
            label="Password"
            onBlur={onBlur}
            onChangeText={passwordRepeat => onChange(passwordRepeat)}
            value={value}
          />
        )}
        name="passwordRepeat"
        rules={{required: true}}
      />
      <Button
        testID="all-films-button"
        style={styles.button}
        icon="lock"
        mode="outlined"
        onPress={handleSubmit(submitForm)}>
        {loading ? <ActivityIndicator /> : 'Register'}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginHorizontal: 10,
  },
});
