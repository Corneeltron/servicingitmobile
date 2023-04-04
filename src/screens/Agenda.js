import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {agendaItemsObj} from '../mocks/agendaItems';
import AgendaItem from '../components/AgendaItem';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setError, setLoading} from '../redux/slices/authSlice';
import {Button} from 'react-native-paper';
import {setInfo} from '../redux/slices/scheduleSlice';

const AgendaScreen = () => {
  const [items, setItems] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [endDate, setEndDate] = useState();
  const [nextMonthBegDate, setNextMonthBegDate] = useState();
  const [nextMonthEndDate, setNextMonthEndDate] = useState();
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.scheduleReducer.weekData);
  const employeeUrl =
    'https://mygaragedoc.azurewebsites.net/api/serviceit/getschedules?id=1&';

  const getSchedule = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${employeeUrl}startDate=${currentDate}&endDate=${endDate}`,
      );
      dispatch(setInfo(res.data));
    } catch (err) {
      console.log('err', err);
      dispatch(setError('Failed to log in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getNextMonthSchedules = async () => {
    try {
      const res = await axios.get(
        `${employeeUrl}startDate=${nextMonthBegDate}&endDate=${nextMonthEndDate}`,
      );
      dispatch(setInfo(res.data));
    } catch (err) {
      console.log('err', err);
      dispatch(setError('Failed to log in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadItems = (month) => {
    const firstOfMonth = month.dateString.replace(/.{0,2}$/, '') + '01';
    const lastOfMonth = month.dateString.replace(/.{0,2}$/, '') + '30';
    setNextMonthBegDate(firstOfMonth);
    setNextMonthEndDate(lastOfMonth);
    console.log('dates,', month)
    // in here i drop in the first day of month that comes from onChange and set to currentDate, then i calc end date from it and it'll load the next month
    const eventObjectsArray = schedule.map(task => {
      const taskDate = new Date(task.startDate).toISOString().split('T')[0];
      return {
        [taskDate]: [
          {
            name: task.employee.firstName,
            start: task.startDate,
            end: task.endDate,
            status: task.title,
            customer: {
              name: `${task.customer.firstName} ${task.customer.lastName}`,
              notes: task.customer.notes,
              phone: task.customer.phone1,
              email: task.customer.emailAddress,
              addressLine1: task.customer.custAddress[0].address1,
              addressLine2: task.customer.custAddress[0].address2,
              addressLine3: task.customer.custAddress[0].zip,
            },
          },
        ],
      };
    });
    const eventsByDate = {};
    for (const event of eventObjectsArray) {
      for (const date of Object.keys(event)) {
        if (date in eventsByDate) {
          eventsByDate[date].push(...event[date]);
        } else {
          eventsByDate[date] = event[date];
        }
      }
    }
    setItems(eventsByDate);
  };

  const renderItem = item => {
    return <AgendaItem item={item} />;
  };

  useEffect(() => {
    getNextMonthSchedules();
  }, [nextMonthBegDate])


  useEffect(() => {
    const date = new Date();
    const nowDate = date.toISOString().split('T')[0];
    const endMonth = new Date(date.setDate(date.getDate() + 30))
      .toISOString()
      .split('T')[0];
    setCurrentDate(nowDate);
    setEndDate(endMonth);
  }, [currentDate]);

  return (
    <View style={styles.container}>
      <Button onPress={getNextMonthSchedules}>Pull schedule</Button>
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
