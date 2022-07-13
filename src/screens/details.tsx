import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import DropDown from '../components/dropdown';
import { items } from '../trainData/avaliableStations.json';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

const DetailsScreen: React.FC = () => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
    <DropDown title="From" items={items}></DropDown>
    <DropDown title="To" items={items}></DropDown>
  </View>
);

export default DetailsScreen;
