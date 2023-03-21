import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {agendaItemsObj} from '../mocks/agendaItems';
import AgendaItem from '../components/AgendaItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading } from '../redux/slices/authSlice';
import { Button } from 'react-native-paper';
import { setInfo } from '../redux/slices/scheduleSlice';

const employeeUrl = 'https://mygaragedoc.azurewebsites.net/api/serviceit/getschedules?id=1&';
const starttime = '2019-11-11';
const endtime = '2019-12-11';

const AgendaScreen = (props) => {
  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const mockAgenda = agendaItemsObj;
  const dispatch = useDispatch();
  const employeeData = useSelector(state => state.scheduleReducer.employee);
  const customerData = useSelector(state => state.scheduleReducer.customer);

  const getWeekSchedule = async () => {
    dispatch(setLoading(true));
      try {
        const res = await axios.get(`${employeeUrl}startDate=${starttime}&endDate=${endtime}`)
        console.log('res', res.data[0].customer.custAddress[0].address1)
        dispatch(setInfo(res.data[0]));
      } catch (err) {
        console.log('err', err)
        dispatch(setError ('Failed to log in'));
      } finally {
        dispatch(setLoading(false));
      }
  }


  const loadItems = () => {
    console.log('employeeData', employeeData)
    console.log('customerData', customerData)
    //must turn my data into the proper object for react-native-calendars to ingest
    // setItems(mockData);
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
      <Button onPress={getWeekSchedule}>Pull schedule</Button>
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
