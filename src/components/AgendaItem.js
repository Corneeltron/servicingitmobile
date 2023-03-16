import {useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
        <Card mode="contained" style={styles.shadowProps}>
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
            <Text style={selected ? styles.contentShow : styles.content} variant="bodySmall">{props.item.value}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      {/* <div className={styles.wrapper}>
        <div className={styles.accordian}>
          {data.map((item, idx) => (
            <div key={idx} className={styles.item} onClick={() => toggle(idx)}>
              <div className={styles.title}>
                <h2>{item.question}</h2>
                <span>{selected === idx ? '-' : '+'}</span>
              </div>
              <div
                className={
                  selected === idx ? styles.contentShow : styles.content
                }>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

const styles = StyleSheet.create({
  itemTextWrapper: {
    marginRight: 10,
    marginTop: 17,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '75vh',
    width: '75vw',
    justifyContent: 'center',
    alignItems: 'center',
  },

  accordian: {
    width: 500,
    cursor: 'pointer',
  },

  item: {
    background: '#f0ebe1',
    borderRadius: 10,
    marginBottom: 5,
    padding: '10px 20px',
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
