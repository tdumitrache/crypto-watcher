import { Container, Flex, Grid, Stack, Text, Switch } from '@chakra-ui/react';
import { getTrendiestCoins } from 'api/coins';
import { getCryptoNews } from 'api/news';
import LoadingSpinner from 'common/loading-spinner';
import CryptoTable from 'common/table';
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import {
  CryptoNew,
  GlobalMarketData,
  TrendingCoinsCard,
  SubscribeSection,
} from './components';
import { ICryptoNew } from 'types/news';
import { useCryptoTable } from './hooks';

const Dashboard = () => {
  const [highlight, setHighlight] = useState<boolean>(true);
  const { data: trendiestCoins, isFetching: isFetchingTrendiestCoins } =
    useQuery('getTrendiestCoins', () => getTrendiestCoins());
  const { data: cryptoNewsData, isFetching: isFetchingNewsData } = useQuery(
    'news',
    () => getCryptoNews()
  );

  const { columns, rows, isFetchingCoins } = useCryptoTable();

  return (
    <>
      <Container maxWidth={'1440px'}>
        <Flex direction='column'>
          {isFetchingNewsData ? (
            <LoadingSpinner size={150} />
          ) : (
            <Grid templateColumns='repeat(5, 1fr)' gap='16px' my='24px'>
              {cryptoNewsData &&
                cryptoNewsData.length > 0 &&
                cryptoNewsData
                  ?.filter((_: ICryptoNew, idx: number) => idx < 5)
                  .map((cryptoNew: ICryptoNew, idx: number) => {
                    return (
                      <Fragment key={idx}>
                        <CryptoNew {...cryptoNew} />
                      </Fragment>
                    );
                  })}
            </Grid>
          )}
          <Stack
            direction='row'
            align='center'
            justify='space-between'
            my='12px'
          >
            <GlobalMarketData />
            <Stack direction='row' align='center' spacing='6px'>
              <Text fontSize='14px' fontWeight={'600'} color='gray.600'>
                Highlight
              </Text>
              <Switch
                size='md'
                defaultChecked
                onChange={() => setHighlight(!highlight)}
              />
            </Stack>
          </Stack>
          {isFetchingTrendiestCoins ? (
            <LoadingSpinner size={150} />
          ) : (
            <Stack
              direction='row'
              spacing='12px'
              align='center'
              display={highlight ? 'flex' : 'none'}
            >
              <TrendingCoinsCard
                trendiestCoins={trendiestCoins?.filter((_, idx) => idx < 3)!}
              />
              <TrendingCoinsCard
                trendiestCoins={
                  trendiestCoins?.filter((_, idx) => idx > 2 && idx < 6)!
                }
              />
            </Stack>
          )}

          {isFetchingCoins ? (
            <LoadingSpinner size={150} />
          ) : (
            <CryptoTable rows={rows} columns={columns} />
          )}
        </Flex>
      </Container>
      <SubscribeSection />
    </>
  );
};

export default Dashboard;
