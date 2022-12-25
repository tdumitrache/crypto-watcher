import axios from 'axios';
import { ICryptoNew } from 'types/news';

const API_URL = 'https://mrnewsapi.p.rapidapi.com/news/crypto';

const options = {
  headers: {
    'X-RapidAPI-Key': 'f62c7571eemsh0a14351f0278fb9p1bdb2ajsn859acfe6823d',
    'X-RapidAPI-Host': 'mrnewsapi.p.rapidapi.com',
  },
};

export const getCryptoNews = async (): Promise<ICryptoNew[]> => {
  const response = await axios.get(API_URL, options);

  return response.data;
};
