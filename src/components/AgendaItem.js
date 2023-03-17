import {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {Text, Card, Avatar} from 'react-native-paper';

export default function AgendaItem(props) {
  const [selected, setSelected] = useState(false);

  const toggle = idx => {
    if (selected === idx) {
      return setSelected(null);
    }

    setSelected(idx);
  };

  const avatarLetter = props.item.name.slice(0,1)

  const subItem = (
    <Text style={{color: '#616161', fontWeight: 300}}>
      {props.item.start} - {props.item.end}
      {'\n'}
      {props.item.status}
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
              title={props.item.name}
              subtitle={subItem}
              subtitleNumberOfLines={2}
              right={props => (
                <Avatar.Text {...props} label={`${avatarLetter}`} />
              )}
            />
              <Text>Customer Information</Text>
            <View style={styles.customerInfo} variant="bodySmall">
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
    display: 'grid',
    width: '90%',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: '1fr 2fr 1fr 1fr 2fr'
  }
});
