import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import TicketFlatList from '../components/ticketsFlatList';
import { JourneyResponse } from '../types/JourneyResponse';
import { JourneyOutput } from '../types/JourneyOutput';
import getJourney from '../repository/getJourney';

type JourneyScreenProps = ScreenNavigationProps<'Journey'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'light blue',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    padding: 5,
  },
});
const JourneyScreen: React.FC<JourneyScreenProps> = ({ route, navigation }) => {
  const [journey, setJourney] = React.useState<JourneyResponse | null>(null);
  useEffect(() => {
    const updateJourney = async () => {
      const journey = await getJourney(
        route.params.departStation.value,
        route.params.arriveStation.value,
      );
      setJourney(journey);
    };
    void updateJourney();
  }, [journey]);

  const [tickets, setTickets] = React.useState<Array<JourneyOutput> | null>(
    null,
  );

  useEffect(() => {
    let journeyOut = Array<JourneyOutput>();
    if (journey === null) {
      journeyOut = null;
    } else {
      for (let i = 0; i < journey.outboundJourneys.length; i++) {
        journeyOut.push({
          journeyID: journey.outboundJourneys[i].journeyId,
          departureTime: journey.outboundJourneys[i].departureTime,
          arrivalTime: journey.outboundJourneys[i].arrivalTime,
          primaryTrainOperator:
            journey.outboundJourneys[i].primaryTrainOperator,
          tickets: journey.outboundJourneys[i].tickets,
          originStation: journey.outboundJourneys[i].originStation,
          destinationStation: journey.outboundJourneys[i].destinationStation,
        });
      }
    }
    void setTickets(journeyOut);
  }, [journey]);

  return (
    <View style={styles.container}>
      {}
      <Text style={styles.text}>Available Journeys</Text>
      {tickets == null && <Text>Loading, please wait...</Text>}
      {tickets !== null && <TicketFlatList items={tickets} />}
    </View>
  );
};

export default JourneyScreen;
