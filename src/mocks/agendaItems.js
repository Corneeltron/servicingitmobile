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
  '2023-03-21': [
    {
      name: 'Ron',
      start: '08:00 AM',
      end: '09:00 AM',
      status: 'Follow Up',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }
    },
    {
      name: 'Jason',
      start: '09:00 AM',
      end: '10:00 AM',
      status: 'En route',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
  ],
  '2023-03-22': [
    {
      name: 'Tony',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'En route',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
    {
      name: 'Ron',
      start: '08:00 AM',
      end: '10:30 AM',
      status: 'Finished',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
  ],
  '2023-03-23': [
    {
      name: 'Jason',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'Follow Up',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
    {
      name: 'Ron',
      start: '12:00 AM',
      end: '12:30 AM',
      status: 'Follow Up',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
  ],
  '2023-03-24': [
    {
      name: 'Tony',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'En route',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
    {
      name: 'Jason',
      start: '12:00 PM',
      end: '1:30 PM',
      status: 'Follow Up',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
  ],
  '2023-03-25': [
    {
      name: 'Ron',
      start: '10:00 AM',
      end: '11:00 AM',
      status: 'Finished',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
    },
    {
      name: 'Jason',
      start: '12:00 PM',
      end: '12:30 PM',
      status: 'Follow Up',
      value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      customer: {
        name: 'Aline Avila',
        notes: "rehang- get email last name at gate is Guo buzz the gate",
        phone: '867-5309',
        email: 'update',
        addressLine1: '2045 Waterside Circle',
        addressLine2: 'Westlake Village, CA',
        addressLine3: '91362'
      }  
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
