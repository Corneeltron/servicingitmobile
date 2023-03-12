import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { connect } from 'react-redux';

const Loader = (props) => {
  return (
    props.loadingState.show ? 
    <View style={styles.backdrop}>
      <ActivityIndicator color={styles.spinner.color} animating={true} />
    </View>
    : null
  );
};

const mapStateToProps = (store) => ({
  loadingState: store.loading
})

export default connect(mapStateToProps)(Loader);

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

