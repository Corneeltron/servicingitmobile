import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCurrentUser, selectCurrentToken} from '../redux/slices/authSlice';
import {Link} from '@react-navigation/native';
import {Text} from 'react-native-paper';

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : 'Welcome!';
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <View>
      <Text>{welcome}</Text>
      <Text>Token: {tokenAbbr}</Text>
      <Text>
        <Link to="Dashboard">Go to the dashboard</Link>
      </Text>
    </View>
  );

  return content;
};

export default Welcome;
