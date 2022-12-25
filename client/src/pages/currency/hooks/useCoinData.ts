import { useQuery } from 'react-query';
import { getCoinData } from 'api/coins';

export const useCoinData = (id: string) => {
  const { data, isFetching: isFetchingCoinData } = useQuery('getCoinData', () =>
    getCoinData(id)
  );

  return {
    data,
    isFetchingCoinData,
  };
};
