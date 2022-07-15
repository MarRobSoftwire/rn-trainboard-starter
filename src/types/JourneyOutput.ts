export type JourneyOutput = {
  journeyID: string;
  departureTime: string;
  arrivalTime: string;
  primaryTrainOperator: TrainOperator;
  tickets: Array<Ticket>;
  originStation: StationInfo;
  destinationStation: StationInfo;
};

export type StationInfo = {
  displayName: string;
  crs: string;
};

export type TrainOperator = {
  code: string;
  name: string;
};

export type Ticket = {
  name: string;
  priceInPennies: number;
};
