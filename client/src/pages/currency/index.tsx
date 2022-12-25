import { Stack } from '@chakra-ui/react';
import { useCoinData } from './hooks/useCoinData';
import { useParams } from 'react-router-dom';
import { Header } from './components';
import LoadingSpinner from 'common/loading-spinner';

const Currency = () => {
  const { id } = useParams();
  const { data, isFetchingCoinData } = useCoinData(id!);

  if (isFetchingCoinData) {
    return <LoadingSpinner size={200} />;
  }

  return (
    <Stack direction={'column'} spacing='12px'>
      <Header data={data!} />
    </Stack>
  );
};

export default Currency;
