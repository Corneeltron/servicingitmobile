import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectIsLoggedIn,
  selectEmail,
  selectUserName,
  setSignOut,
} from '../redux/slices/authSlice';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const username = useSelector(selectUserName);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
      <Text>Welcome to Dashboard</Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          paddingHorizontal: 50,
          paddingVertical: 15,
          margin: 10,
        }}
        onPress={() => null}>
        <Text style={{color: 'white'}}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
