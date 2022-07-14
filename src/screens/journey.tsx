import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { config } from '../config';
import { ScreenNavigationProps } from '../routes';

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

type JourneyOutput = {
  journeyID: string;
  departureTime: string;
  arrivalTime: string;
  // TO DO : Add functionality
  //primaryTrainOperator: TrainOperator;
  //tickets: Array<Tickets>;
};

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
const getJourney = async (): Promise<JourneyResponse> => {
  const response = await fetch(
    `${baseUrl}/v1/fares?originStation=KGX&destinationStation=DON&outboundDateTime=2022-07-15T12:16:27.371&numberOfChildren=0&numberOfAdults=1`,
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
      const journey = await getJourney();
      setJourney(journey);
    };
    void updateJourney();
  }, [journey]);

  const [tickets, setTickets] = React.useState<Array<string>>([
    defaultJourneyOutput.journeyID,
  ]);

  useEffect(() => {
    const journeyOut = [];
    if (journey === null) {
      journeyOut.push(defaultJourneyOutput.journeyID);
    } else {
      for (let i = 0; i < journey.outboundJourneys.length; i++) {
        journeyOut.push(journey.outboundJourneys[i].journeyId);
      }
    }
    // journey === null
    //   ? [defaultJourneyOutput.journeyID]
    //   : journey.outboundJourneys.map<string>(
    //     (outboundJourney: OutboundJourney) => {
    //         outboundJourney.journeyId;
    //     },
    //   );
    void setTickets(journeyOut);
  }, [journey]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Journey Screen</Text>
      {tickets.map((ticket: string) => (
        <Text>{ticket}</Text>
      ))}
    </View>
  );
};

export default JourneyScreen;
