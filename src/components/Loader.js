import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector } from 'react-redux';

const Loader = () => {
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  return (
    isLoading ? 
    <View style={styles.backdrop}>
      <ActivityIndicator color={styles.spinner.color} animating={true} />
    </View>
    : null
  );
};

export default Loader;

const styles = StyleSheet.create({
  backdrop: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  spinner: {
    color: "white"
  }
});

