import axios from 'axios';
const baseURL = 'http://rest.coinapi.io/v1';
const timeout = 60000;

export const http = axios.create({
  baseURL,
  timeout,
});

http.interceptors.request.use((config) => {
  config.headers = {'X-CoinAPI-Key': process.env.REACT_APP_API_KEY || ''};
  return config;
})