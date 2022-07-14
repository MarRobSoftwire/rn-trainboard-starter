import React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { JourneyOutput } from '../types/JourneyOutput';

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'orange'
  }
});

const listStyle = StyleSheet.create({
  container: {
    backgroundColor: '#83ccde',
  },
});

type TicketFlatListProps = {
  items: Array<JourneyOutput>;
};

const TicketsFlatList: React.FC<TicketFlatListProps> = ({ items }) => {
  const renderItem = ({ item }) => (
    <View style = {styles.item}>
      <Text>{item.departureTime.slice(0,10)} {item.departureTime.slice(11,16)}</Text>
      <Text>{item.arrivalTime.slice(0, 10)} {item.arrivalTime.slice(11, 16)}</Text>
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

export default TicketsFlatList;