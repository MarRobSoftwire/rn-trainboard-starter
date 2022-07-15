import { config } from '../config';
import { StationResponse } from '../types/StationResponse';

const getStations = async (): Promise<StationResponse> => {
  const response = await fetch(`${config.baseURL}/v1/stations`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
    },
  });
  const json = (await response.json()) as StationResponse;
  return json;
};

export default getStations;
