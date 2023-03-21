import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {agendaItemsObj} from '../mocks/agendaItems';
import AgendaItem from '../components/AgendaItem';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setError, setLoading } from '../redux/slices/authSlice';

const employeeUrl = 'https://mygaragedoc.azurewebsites.net/api/serviceit/getemployees';

const AgendaScreen = (props) => {
  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const mockAgenda = agendaItemsObj;
  const dispatch = useDispatch();

  const getEmployeeInfo = async () => {
    dispatch(setLoading(true));
      try {
        const res = await axios.get(employeeUrl)
        dispatch(setToken(res.data.token))
      } catch (err) {
        console.log('err', err)
        dispatch(setError ('Failed to log in'));
      } finally {
        dispatch(setLoading(false));
      }
  }


  const loadItems = () => {
    const mockData = mockAgenda;
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

export default AgendaScreen;

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
