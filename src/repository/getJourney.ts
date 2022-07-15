import { config } from '../config';
import { JourneyResponse } from '../types/JourneyResponse';

const baseUrl = 'https://mobile-api-softwire2.lner.co.uk';

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

export default getJourney;
