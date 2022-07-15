import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import TicketFlatList from '../components/ticketsFlatList';
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
const JourneyScreen: React.FC<JourneyScreenProps> = ({ route }) => {
  const [tickets, setTickets] = React.useState<Array<JourneyOutput> | null>(
    null,
  );

  useEffect(() => {
    const updateJourney = async () => {
      console.log('start api call');
      const journey = await getJourney(
        route.params.departStation.value ?? 'KGX', // TODO: PLEASE FIX THESE TYPES AND REMOVE THIS
        route.params.arriveStation.value ?? 'EDB', // TODO: PLEASE FIX THESE TYPES AND REMOVE THIS
      );
      console.log('response');
      const mappedOutboundJourneys = journey.outboundJourneys.map(
        (outboundJourney) => ({
          journeyID: outboundJourney.journeyId,
          departureTime: outboundJourney.departureTime,
          arrivalTime: outboundJourney.arrivalTime,
          primaryTrainOperator: outboundJourney.primaryTrainOperator,
          tickets: outboundJourney.tickets,
          originStation: outboundJourney.originStation,
          destinationStation: outboundJourney.destinationStation,
        }),
      );
      setTickets(mappedOutboundJourneys);
    };
    void updateJourney();
  }, [route.params.arriveStation.value, route.params.departStation.value]);

  const waitingForRoutes = tickets === null;
  const noRoutes = tickets !== null && tickets.length === 0;
  const routesFound = tickets !== null && tickets.length > 0;

  return (
    <View style={styles.container}>
      {}
      <Text style={styles.text}>Available Journeys:</Text>
      { waitingForRoutes && <Text>Loading, please wait...</Text>}
      {noRoutes && <Text>No available routes</Text>}
      {routesFound && <TicketFlatList items={tickets} />}
    </View>
  );
};

export default JourneyScreen;
