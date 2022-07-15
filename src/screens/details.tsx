import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DropDown from '../components/dropdown';
//import { items } from '../trainData/avaliableStations.json';
import { DropdownItem } from '../types/DropDownItem';
import { ScreenNavigationProps } from '../routes';
import { StationResponse, ResponseStationInfo } from '../types/StationResponse';
import { useEffect } from 'react';
import getStations from '../repository/getStations';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});

const defaultStation: DropdownItem = {
  displayName: 'Pick a station',
  value: null,
};

type DetailsScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const [departureStation, setDeparture] = React.useState(defaultStation);
  const [arrivalStation, setArrival] = React.useState(defaultStation);

  const [items, setItems] = React.useState<DropdownItem[]>([]);

  useEffect(() => {
    const updateStations = async () => {
      const stationResponse = await getStations();
      const stationItems = stationResponse.stations
        .map((station: ResponseStationInfo) => ({
          displayName: station.name,
          value: station.crs,
        }))
        .filter((station) => station.value !== null);
      const deduplicatedStationItems = _.uniqBy(stationItems, 'value');
      setItems(deduplicatedStationItems);
    };
    void updateStations();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <DropDown
        title="From"
        items={items}
        setSelected={setDeparture}
        selected={departureStation}
      />

      <DropDown
        title="To"
        items={items}
        setSelected={setArrival}
        selected={arrivalStation}
      />
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('Journey', {
            departStation: departureStation,
            arriveStation: arrivalStation,
          })
        }
      >
        Whens my train leaving?
      </Button>
    </View>
  );
};

export default DetailsScreen;
