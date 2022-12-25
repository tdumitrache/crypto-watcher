import { useState } from 'react';
import { useQuery } from 'react-query';
import { ICryptocurrency } from 'api/coins/types';
import { getAllCoins } from 'api/coins';

const useCryptoTable = () => {
  const [rows, setRows] = useState<ICryptocurrency[] | []>([]);

  const columns = [
    {
      Header: '#',
      accessor: 'market_cap_rank',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
    {
      Header: '1h %',
      accessor: 'price_change_percentage_1h_in_currency',
    },
    {
      Header: '24h %',
      accessor: 'price_change_percentage_24h_in_currency',
    },
    {
      Header: '7d %',
      accessor: 'price_change_percentage_7d_in_currency',
    },
    {
      Header: 'Market Cap',
      accessor: 'market_cap',
    },
    {
      Header: 'Volume(24h)',
      accessor: 'total_volume',
    },
    {
      Header: 'Circulating Supply',
      accessor: 'circulating_supply',
    },
    {
      Header: 'Last 7 days',
      accessor: 'sparkline_in_7d',
    },
  ];

  const { isFetching: isFetchingCoins } = useQuery(
    'getAllCoins',
    () => getAllCoins(),
    {
      onSuccess: (data: ICryptocurrency[]) => {
        if (data) {
          const coins: ICryptocurrency[] = data.map((coin) => {
            return {
              market_cap_rank: coin.market_cap_rank,
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              current_price: coin.current_price,
              image: coin.image,
              price_change_percentage_1h_in_currency:
                coin.price_change_percentage_1h_in_currency,
              price_change_percentage_24h_in_currency:
                coin.price_change_percentage_24h_in_currency,
              price_change_percentage_7d_in_currency:
                coin.price_change_percentage_7d_in_currency,
              market_cap: coin.market_cap,
              total_volume: coin.total_volume,
              circulating_supply: coin.circulating_supply,
              max_supply: coin.max_supply,
              sparkline_in_7d: { price: coin.sparkline_in_7d.price },
            };
          });
          setRows(coins);
        }
      },
    }
  );

  return {
    columns,
    rows,
    isFetchingCoins,
  };
};

export default useCryptoTable;
