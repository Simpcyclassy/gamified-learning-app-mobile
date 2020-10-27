import secrets from './secrets';

export const Color = {
  primary: '#5b7dd3',
};

const Config = {
  maxPages: 2,
  fetchRetry: 2,
  fetchTimeout: 800,
  DATA_URL: `https://www.omdbapi.com/?apikey=${secrets.APIKEY}`,
};

export default Config;
