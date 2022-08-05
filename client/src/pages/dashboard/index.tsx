import { useState, Fragment } from 'react';
import { Container, Flex, Grid, Text, Stack } from '@chakra-ui/react';
import { getCryptoNews } from 'api/news';
import { useQuery } from 'react-query';
import { CryptoNew, GlobalMarketData, TrendingCoinsCard } from './components';
import { ICryptoNew } from './types';
import { getGlobalMarketData, getTrendiestCoins } from 'api/coins';
import LoadingSpinner from 'common/loading-spinner';

const Dashboard = () => {

  const { data: trendiestCoins, isFetching: isFetchingTrendiestCoins } = useQuery("getTrendiestCoins", () => getTrendiestCoins())
  const { data: cryptoNewsData, isFetching: isFetchingNewsData } = useQuery('news', () => getCryptoNews());



  return (
    <Container maxWidth={'1440px'}>
      <Flex direction='column'>
        {
          isFetchingNewsData
            ? (
              <LoadingSpinner size={150} />
            )
            : (
              <Grid templateColumns='repeat(5, 1fr)' gap='16px' my='24px'>
                {cryptoNewsData && cryptoNewsData?.filter((_: ICryptoNew, idx: number) => idx < 5).map((cryptoNew: ICryptoNew, idx: number) => {
                  return (
                    <Fragment key={idx}>
                      <CryptoNew {...cryptoNew} />
                    </Fragment>
                  );
                })}
              </Grid>

            )
        }
        <GlobalMarketData />
        <Stack direction="row" spacing="12px" align="center">
          <TrendingCoinsCard trendiestCoins={trendiestCoins?.filter((_, idx) => idx < 3)!} isFetchingTrendiestCoins={isFetchingTrendiestCoins} />
          <TrendingCoinsCard trendiestCoins={trendiestCoins?.filter((_, idx) => idx > 2 && idx < 6)!} isFetchingTrendiestCoins={isFetchingTrendiestCoins} />
        </Stack>
      </Flex>
    </Container>
  );
};

export default Dashboard;
