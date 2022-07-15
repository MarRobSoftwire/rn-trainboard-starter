import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { JourneyOutput } from '../types/JourneyOutput';

const styles = StyleSheet.create({
  ticket: {
    padding: 3,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {
      height: 6,
      width: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    width: 224
  },
  item: {
    padding: 4,
    backgroundColor: 'white',
  },
  header: {
    padding: 4,
    backgroundColor: 'orange',
  },
  footer: {
    backgroundColor: 'orange',
  },
});

type TicketFlatListProps = {
  items: Array<JourneyOutput>;
};

const TicketsFlatList: React.FC<TicketFlatListProps> = ({ items }) => {
  const renderItem = ({ item }) => (
    <View style={styles.ticket}>
      <View style={styles.header}>
        <Text>{item.tickets[0].name}</Text>
      </View>
      <View style={styles.item}>
        <Text>
          From: {item.originStation.displayName} {'\n'}
          To: {item.destinationStation.displayName}
        </Text>
        <Text>
          {mapIsoDateTimeToDisplayDate(item.departureTime)}
          {'  '}
          {mapIsoDateTimeToDisplayTime(item.departureTime)}
        </Text>
        <Text>
          {mapIsoDateTimeToDisplayDate(item.arrivalTime)}
          {'  '}
          {mapIsoDateTimeToDisplayTime(item.arrivalTime)}
        </Text>
        <Text>{item.primaryTrainOperator.name}</Text>
      </View>
      <View style={styles.footer}>
        <Text>£{(item.tickets[0].priceInPennies / 100).toFixed(2)}</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.journeyID}
    />
  );
};

const mapIsoDateTimeToDisplayDate = (dateTime: string): string =>
  dateTime.slice(0, 10);
const mapIsoDateTimeToDisplayTime = (dateTime: string): string =>
  dateTime.slice(11, 16);

export default TicketsFlatList;
