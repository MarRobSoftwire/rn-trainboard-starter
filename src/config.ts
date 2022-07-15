const throwConfigError = (key: string) => {
  throw new Error(`Missing environment variable: ${key}.`);
};

// Note that including an API key in an app is not very secure, as the app can be
// decompiled to access it. It's fine for this training exercise though.
const apiKey = process.env.API_KEY ?? throwConfigError('API_KEY');
const baseURL = process.env.BASE_URL ?? throwConfigError('BASE_URL');


export const config = {
  apiKey,
  baseURL,
};
