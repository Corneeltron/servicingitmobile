import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  useTheme,
  Button,
  Modal,
  Portal,
  TextInput
} from 'react-native-paper';

export default function AgendaItem({item}) {
  const theme = useTheme();
  const {customer} = item;
  const [selected, setSelected] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const avatarLetter = item.name.slice(0, 1);
  const start = new Date(item.start).toISOString().split('T')[0];
  const end = new Date(item.end).toISOString().split('T')[0];
  const subItem = (
    <Text style={{color: '#616161', fontWeight: 300}}>
      {start} - {end}
      {'\n'}
      {item.status}
    </Text>
  );
  return (
    <>
      <Card
        mode="contained"
        style={styles.itemTextWrapper}
        onPress={() => setSelected(!selected)}>
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
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.customerInfo} variant="bodySmall">
              <Text style={{fontWeight: 600}}>Customer Information{'\n'}</Text>
              <View style={styles.itemsContainer}>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Name:</Text>
                  <Text>{customer.name}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Notes:</Text>
                  <Text>{customer.notes}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Phone:</Text>
                  <Text>{customer.phone}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Email:</Text>
                  <Text>{customer.email}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemText}>Address:</Text>
                  <Text>
                    {customer.addressLine1}
                    {'\n'}
                    {customer.addressLine2
                      ? customer.addressLine2
                      : customer.addressLine3}
                  </Text>
                </View>
              </View>
            </View>
            <Button
              onPress={showModal}
              icon="pen-plus"
              style={{backgroundColor: 'transparent'}}
            />
          </View>
        </Card.Content>
      </Card>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            ...styles.containerStyle,
            backgroundColor: theme.colors.surfaceVariant,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Qty</Text>
            </View>
            <View>
              <Text>Description</Text>
            </View>
            <View>
              <Text>Price</Text>
            </View>
          </View>
          <TextInput
            label="Notes"
            mode="outlined"
            defaultValue={text}
            onChangeText={text => setText(text)}
            multiline={true}
            style={{ flex: 1, height: 50 }}
          />
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    margin: 20,
    borderRadius: 15,
    height: '90%',
    width: 'auto',
  },
  itemsContainer: {
    gap: 10,
  },
  itemTextWrapper: {
    marginRight: 10,
    marginTop: 17,
  },
  item: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    flexDirection: 'row',
    width: '90%',
  },
  itemText: {
    fontWeight: 700,
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
    padding: 17,
  },
});
