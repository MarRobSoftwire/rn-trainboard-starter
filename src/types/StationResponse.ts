export type StationResponse = {
  stations: Array<ResponseStationInfo>;
};

export type ResponseStationInfo = {
  id: number;
  name: string;
  crs: string;
};
