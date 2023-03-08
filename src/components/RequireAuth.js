import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectCurrentToken} from '../redux/slices/authSlice';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const navigation = useNavigation();

  //here i need to work on checking for token and then routing to the protected routes if logged in, and outside to login screen when logged out. must work on routes in App.jsx
  return token
    ? navigation.navigate('Dashboard')
    : navigation.navigate('Login');
};

export default RequireAuth;
