import isEmpty from 'lodash/isEmpty';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split('T')[0];
}

export const agendaItems = [
  {
    title: dates[0],
    data: [{hour: '8am', duration: '1h', title: 'Ron'}],
  },
  {
    title: dates[1],
    data: [
      {hour: '8am', duration: '1h', title: 'Jason'},
      {hour: '11am', duration: '2h', title: 'Tony'},
    ],
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ron'},
      {hour: '2pm', duration: '2h', title: 'Jason'},
      {hour: '3pm', duration: '1h', title: 'Tony'},
    ],
  },
  {
    title: dates[3],
    data: [{hour: '9am', duration: '2h', title: 'Ron'}],
  },
  {
    title: dates[4],
    data: [{}],
  },
  {
    title: dates[5],
    data: [
      {hour: '9am', duration: '1h', title: 'Ron'},
      {hour: '10am', duration: '1h', title: 'Jason'},
      {hour: '11am', duration: '2h', title: 'Tony'},
      {hour: '12pm', duration: '1h', title: 'Ron'},
    ],
  },
  {
    title: dates[6],
    data: [{hour: '8am', duration: '1h', title: 'Ron'}],
  },
  {
    title: dates[7],
    data: [{}],
  },
  {
    title: dates[8],
    data: [
      {hour: '9am', duration: '2h', title: 'Tony'},
      {hour: '10am', duration: '1h', title: 'Jason'},
      {hour: '11am', duration: '1h', title: 'Tony'},
      {hour: '12pm', duration: '1h', title: 'Ron'},
    ],
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ron'},
      {hour: '2pm', duration: '1h', title: 'Jason'},
      {hour: '3pm', duration: '1h', title: 'Tony'},
    ],
  },
  {
    title: dates[10],
    data: [{hour: '12pm', duration: '1h', title: 'Tony'}],
  },
  {
    title: dates[11],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ron'},
      {hour: '2pm', duration: '1h', title: 'Jason'},
      {hour: '3pm', duration: '1h', title: 'Tony'},
    ],
  },
  {
    title: dates[12],
    data: [{hour: '12am', duration: '1h', title: 'Jason'}],
  },
  {
    title: dates[13],
    data: [{hour: '12pm', duration: '1h', title: 'Jason'}],
  },
];

export const agendaItemsObj = {
  '2023-03-10': [
    {
      name: 'Ron',
      start: '08:00 AM',
      end: '09:00 AM',
      status: 'Follow Up',
    },
    {
      name: 'Jason',
      start: '09:00 AM',
      end: '10:00 AM',
      status: 'En route',
    },
  ],
  '2023-03-11': [
    {
      name: 'Tony',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'En route',
    },
    {
      name: 'Ron',
      start: '08:00 AM',
      end: '10:30 AM',
      status: 'Finished',
    },
  ],
  '2023-03-12': [
    {
      name: 'Jason',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'Follow Up',
    },
    {
      name: 'Ron',
      start: '12:00 AM',
      end: '12:30 AM',
      status: 'Follow Up',
    },
  ],
  '2023-03-13': [
    {
      name: 'Tony',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'En route',
    },
    {
      name: 'Jason',
      start: '12:00 PM',
      end: '1:30 PM',
      status: 'Follow Up',
    },
  ],
  '2023-03-14': [
    {
      name: 'Ron',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'Finished',
    },
    {
      name: 'Jason',
      start: '12:00 PM',
      end: '12:30 PM',
      status: 'Follow Up',
    },
  ],
};

export function getMarkedDates() {
  const marked = {};

  agendaItems.forEach(item => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
    }
  });
  return marked;
}
