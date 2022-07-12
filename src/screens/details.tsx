import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import DropDown from '../components/dropdown';
import { items } from '../trainData/avaliableStations.json';

type DropdownItem = {
  displayName: string;
  value: string | null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

const defaultStation: DropdownItem = {
  displayName: 'Pick a station',
  value: null,
};

const DetailsScreen: React.FC = () => {
  const [selected, setSelected] = React.useState(defaultStation);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <DropDown
        title="From"
        items={items}
        setSelected={setSelected}
        selected={selected}
      ></DropDown>
      <DropDown
        title="From"
        items={items}
        setSelected={setSelected}
        selected={selected}
      ></DropDown>
      <Text>{selected}</Text>
    </View>
  );
};

export default DetailsScreen;
