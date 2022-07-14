import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { config } from '../config';
import { ScreenNavigationProps } from '../routes';
import TicketFlatList from '../components/ticketsFlatList';
import { JourneyOutput } from '../types/JourneyOutput';

const baseUrl = 'https://mobile-api-softwire2.lner.co.uk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
  },
});

type JourneyScreenProps = ScreenNavigationProps<'Journey'>;

type JourneyResponse = {
  numberOfAdults: number;
  nextOutboundQuery: string;
  outboundJourneys: Array<OutboundJourney>;
};

type OutboundJourney = {
  journeyId: string;
  departureTime: string;
  arrivalTime: string;
  primaryTrainOperator: TrainOperator;
  tickets: Array<Tickets>;
};

type TrainOperator = {
  code: string;
  name: string;
};

type Tickets = {
  name: string;
  priceInPennies: number;
};

const defaultJourneyOutput: JourneyOutput = {
  journeyID: 'Waiting for journey ...',
  departureTime: 'Waiting for departure time ...',
  arrivalTime: 'Waiting for arrival time ...',
};

//
//TODO: add originStation and destinationStation functionality
//
const getJourney = async (
  originStationCode: string,
  destinationStationCode: string,
): Promise<JourneyResponse> => {
  const response = await fetch(
    `${baseUrl}/v1/fares?originStation=${originStationCode}&destinationStation=${destinationStationCode}&outboundDateTime=2022-07-15T12:16:27.371&numberOfChildren=0&numberOfAdults=1`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    },
  );
  const json = (await response.json()) as JourneyResponse;
  return json;
};

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

  const [tickets, setTickets] = React.useState<Array<JourneyOutput>>([
    defaultJourneyOutput,
  ]);

  useEffect(() => {
    const journeyOut = Array<JourneyOutput>();
    if (journey === null) {
      journeyOut.push(defaultJourneyOutput);
    } else {
      for (let i = 0; i < journey.outboundJourneys.length; i++) {
        journeyOut.push({
          journeyID: journey.outboundJourneys[i].journeyId,
          departureTime: journey.outboundJourneys[i].departureTime,
          arrivalTime: journey.outboundJourneys[i].arrivalTime,
        });
      }
    }
    void setTickets(journeyOut);
  }, [journey]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Journey Screen</Text>
      <TicketFlatList items={tickets} />
    </View>
  );
};

export default JourneyScreen;
