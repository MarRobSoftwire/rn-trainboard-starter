import { TrainOperator, Ticket, StationInfo } from './JourneyResponse';

export type JourneyOutput = {
  journeyID: string;
  departureTime: string;
  arrivalTime: string;
  primaryTrainOperator: TrainOperator;
  tickets: Array<Ticket>;
  originStation: StationInfo;
  destinationStation: StationInfo;
};
