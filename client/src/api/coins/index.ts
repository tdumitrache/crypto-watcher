import axios, { AxiosResponse } from 'axios';
import { ITrendyCoin, IGlobalMarketData } from './types';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getTrendiestCoins = async (): Promise<ITrendyCoin[]> => {
  const response = await axios.get(`${API_URL}/search/trending`);

  return response.data.coins;
};

export const getGlobalMarketData = async (): Promise<IGlobalMarketData> => {
  const response = await axios.get(`${API_URL}/global`);

  return response.data.data;
};

export const getAllCoins = async (): Promise<any> => {
  const response = await axios.get(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );

  return response.data;
};
