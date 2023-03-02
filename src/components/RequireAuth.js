import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectCurrentToken} from '../redux/slices/authSlice';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const navigation = useNavigation();

  return token
    ? navigation.navigate('Dashboard')
    : navigation.navigate('Login');
};

export default RequireAuth;
