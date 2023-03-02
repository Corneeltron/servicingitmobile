import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {TextInput, Button, Headline} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../redux/slices/authSlice';

const Login = () => {
  const {loading, userInfo, error, success} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitForm = data => {
    dispatch(userLogin(data));
    console.log('logindata', data);
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate('Dashboard');
    }
  }, [navigation, userInfo]);

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
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

        <Button
          testID="search-button"
          style={styles.button}
          icon="account"
          mode="contained"
          onPress={handleSubmit(submitForm)}>
          Log in
        </Button>
        <Button
          testID="all-films-button"
          style={styles.button}
          icon="lock"
          mode="outlined"
          onPress={() => navigateToRegister()}>
          Sign up
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default Login;
