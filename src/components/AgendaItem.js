import {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Text, Card, Avatar} from 'react-native-paper';

export default function AgendaItem(props) {
  const {item} = props;
  const {customer} = item;
  const [selected, setSelected] = useState(false);

  const avatarLetter = item.name.slice(0,1)

  const subItem = (
    <Text style={{color: '#616161', fontWeight: 300}}>
      {item.start} - {item.end}
      {'\n'}
      {item.status}
    </Text>
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => setSelected(!selected)}
        style={styles.itemTextWrapper}>
        <Card mode="contained">
          <Card.Content>
            <Card.Title
              titleVariant="titleLarge"
              title={item.name}
              subtitle={subItem}
              subtitleNumberOfLines={2}
              right={props => (
                <Avatar.Text {...props} label={`${avatarLetter}`} />
              )}
            />
            <View style={styles.customerInfo} variant="bodySmall">
              <Text style={{fontWeight: 600}}>Customer Information{"\n"}</Text>
              <View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Name:</Text><Text>{customer.name}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Notes:</Text><Text>{customer.notes}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Phone:</Text><Text>{customer.phone}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Email:</Text><Text>{customer.email}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Address:</Text><Text>{customer.addressLine1}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Name:</Text><Text>{customer.addressLine2}</Text></View>
                <View style={{display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}><Text>Name:</Text><Text>{customer.addressLine3}</Text></View>
              </View>
              </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  itemTextWrapper: {
    marginRight: 10,
    marginTop: 17,
  },
  content: {
    maxHeight: 0,
    overflow: 'hidden',
  },
  contentShow: {
    height: 'auto',
    padding: 15,
    overflow: 'hidden',
    maxHeight: 9999,
  },
  customerInfo: {
    display: 'flex',
    padding: 17
  }
});
