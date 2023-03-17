import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar, Text, Button} from 'react-native-paper';
import {agendaItemsObj} from '../mocks/agendaItems';
import {logout} from '../redux/login/login.actions';
import {connect} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import AgendaItem from '../components/AgendaItem';

const timeToString = time => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const AgendaScreen = (props) => {
  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const mockAgenda = agendaItemsObj;

  const loadItems = () => {
    const mockData = mockAgenda;
    // setTimeout(() => {
    //   for (let i = 0; i < 20; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);

    //     if (!items[strTime]) {
    //       items[strTime] = [];

    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: 'Item for ' + strTime + ' #' + j,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //           day: strTime,
    //         });
    //       }
    //     }
    //   }

    //   const newItems = {};
    //   Object.keys(items).forEach(key => {
    //     newItems[key] = items[key];
    //   });
    //   setItems(newItems);
    // }, 1000);
    setItems(mockData);
  };

  const renderItem = item => {
    return (
      <AgendaItem item={item} />
    );
  };

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    setCurrentDate(date);
  }, [currentDate]);

  return (
    <View style={styles.container}>
      <Agenda
        testID="agenda"
        items={items}
        loadItemsForMonth={loadItems}
        selected={currentDate}
        renderItem={renderItem}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  loadingState: store.loading,
  loginState: store.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: logout,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AgendaScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowProps: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  card: {
    minHeight: 'auto',
  },
  label: {
    paddingTop: 5,
  },
  itemTextWrapper: {
    marginRight: 10,
    marginTop: 17,
  },
});
