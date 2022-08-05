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
