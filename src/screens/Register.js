/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {ActivityIndicator, Appbar, Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {theme} from '../../App';

export const Register = (props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {loading, userInfo, error, success} = useSelector(state => state.auth);

  const {
    handleSubmit,
    register,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  });
  
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
      style={styles.container}
      testID="search-page">
      {/* {error && <View>{error}</View>} */}
      <ScrollView style={styles.registerContainer}>
        {/* <Appbar>
          <Appbar.BackAction />
          <Appbar.Content title="Register" />
        </Appbar> */}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              mode="outlined"
              testID="name-input"
              style={{marginTop: 10}}
              label="Name"
              onBlur={onBlur}
              onChangeText={name => onChange(name)}
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
              onChangeText={email => onChange(email)}
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
              secureTextEntry={true}
              right={<TextInput.Icon color={styles.icon.color} icon="eye" />}
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
              testID="password-repeat-input"
              style={{marginTop: 10}}
              label="Password"
              onBlur={onBlur}
              onChangeText={passwordRepeat => onChange(passwordRepeat)}
              value={value}
              secureTextEntry={true}
              right={<TextInput.Icon color={styles.icon.color} icon="eye" />}
            />
          )}
          name="passwordRepeat"
          rules={{required: true}}
        />
        <Button
          testID="all-films-button"
          style={styles.button}
          icon="account-plus"
          mode="outlined"
          // onPress={handleSubmit(submitForm)}
          onPress={() => navigation.navigate('Calendar')}
          >
          {loading ? <ActivityIndicator /> : 'Register'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainer: {
    width: "80%"
  },
  button: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  icon: {
    color: theme.colors.primary
  }
});
