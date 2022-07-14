import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DropDown from '../components/dropdown';
import { items } from '../trainData/avaliableStations.json';
import { DropdownItem } from '../types/DropDownItem';
import { ScreenNavigationProps } from '../routes';


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

type DetailsScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {

  const [departureStation, setDeparture] = React.useState(defaultStation);
  const [arrivalStation, setArrival] = React.useState(defaultStation);

  function openTrainTimesUrl(
    departureStationCode: string,
    arrivalStationCode: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Linking.openURL(
      `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${departureStationCode}/${arrivalStationCode}/#LiveDepResults`,
    );
  }
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
          openTrainTimesUrl(departureStation.value, arrivalStation.value)
        }
      >
        Find trains
      </Button>
    </View>
  );
};

export default DetailsScreen;

//const URl = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${Station1}/${Station2}/#LiveDepResults`
