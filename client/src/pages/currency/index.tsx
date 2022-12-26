import { Stack } from '@chakra-ui/react';
import { useCoinData } from './hooks/useCoinData';
import { useParams } from 'react-router-dom';
import { Header, Chart } from './components';
import LoadingSpinner from 'common/loading-spinner';

const Currency = () => {
  const { id } = useParams();
  const { data, isFetchingCoinData } = useCoinData(id ?? '');

  if (isFetchingCoinData) {
    return <LoadingSpinner size={200} />;
  }

  return (
    <Stack direction={'column'} spacing='12px'>
      {data && <Header data={data} />}
      {data && <Chart data={data} />}
    </Stack>
  );
};

export default Currency;
