import axios, { AxiosResponse } from 'axios';
import {
  ITrendyCoin,
  IGlobalMarketData,
  IDaysInterval,
  ICryptocurrency,
  ICoinData,
} from 'types/coins';

const API_URL = 'https://api.coingecko.com/api/v3';

export const getTrendiestCoins = async (): Promise<ITrendyCoin[]> => {
  const response = await axios.get(`${API_URL}/search/trending`);

  return response.data.coins;
};

export const getGlobalMarketData = async (): Promise<IGlobalMarketData> => {
  const response = await axios.get(`${API_URL}/global`);

  return response.data.data;
};

export const getAllCoins = async (): Promise<ICryptocurrency[]> => {
  const response = await axios.get(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );

  return response.data;
};

export const getCoinData = async (id: string): Promise<ICoinData> => {
  const response = await axios.get(
    `${API_URL}/coins/${id}?localization=false&tickers=false&community_data=true&developer_data=false&sparkline=false`
  );

  return response.data;
};

export const getCoinMarketChart = async (
  id: string,
  days: IDaysInterval
): Promise<AxiosResponse> => {
  const response = await axios.get(
    `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
  );

  return response.data;
};
