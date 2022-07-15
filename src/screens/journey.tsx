import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import TicketFlatList from '../components/ticketsFlatList';
import { JourneyResponse, OutboundJourney } from '../types/JourneyResponse';
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
      journeyOut = journey.outboundJourneys.map(
        (outboundJourney: OutboundJourney) => ({
          journeyID: outboundJourney.journeyId,
          departureTime: outboundJourney.departureTime,
          arrivalTime: outboundJourney.arrivalTime,
          primaryTrainOperator: outboundJourney.primaryTrainOperator,
          tickets: outboundJourney.tickets,
          originStation: outboundJourney.originStation,
          destinationStation: outboundJourney.destinationStation,
        }),
      );
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
