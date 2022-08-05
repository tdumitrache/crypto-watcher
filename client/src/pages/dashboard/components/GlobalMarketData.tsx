import { Flex, Text } from '@chakra-ui/react';
import { getGlobalMarketData } from 'api/coins';
import { useState } from 'react';
import { useQuery } from 'react-query';

const GlobalMarketData = () => {
  const [showMoreMarketData, setShowMoreMarketData] = useState<boolean>();

  const { data: globalMarketData } = useQuery('globalMarketData', () =>
    getGlobalMarketData()
  );
  return (
    <Flex direction='column'>
      <Text fontSize='24px' color='gray.700' fontWeight='bold' mb='6px'>
        Today's Cryptocurrency Prices by Market Cap
      </Text>
      <Text fontSize='14px' color='gray.600' fontWeight={'500'}>
        The global crypto market cap is{' '}
        <Text
          as='span'
          fontWeight={'bold'}
        >{`$${globalMarketData?.total_market_cap?.usd.toLocaleString(
          'en-US'
        )}`}</Text>
        , a{' '}
        <Text
          as='span'
          fontWeight={'bold'}
          color={
            globalMarketData?.market_cap_change_percentage_24h_usd! < 0
              ? 'red.500'
              : 'green.500'
          }
        >{`${globalMarketData?.market_cap_change_percentage_24h_usd.toFixed(
          2
        )}%`}</Text>{' '}
        change over the last day.{' '}
        <Text
          as='span'
          cursor={'pointer'}
          textDecoration='underline'
          color='gray.600'
          onClick={() => setShowMoreMarketData(!showMoreMarketData)}
        >
          {showMoreMarketData ? 'Read Less' : 'Read More'}
        </Text>
        <Text display={showMoreMarketData ? 'block' : 'none'} mt="12px">
          The total crypto market volume over the last 24 hours is{' '}
          <Text as='span' fontWeight={'bold'}>
            {`$${globalMarketData?.total_volume?.usd.toLocaleString(
              'en-us'
            )}`}
            .{' '}
          </Text>
          The number of all cryptocurrencies are{' '}
          <Text as='span' fontWeight={'bold'} color='gray.600'>
            {globalMarketData?.active_cryptocurrencies}.{" "}<br />
          </Text>

          The number of all markets are{' '}
          <Text as='span' fontWeight={'bold'} color='gray.600'>
            {globalMarketData?.markets}.{" "}
          </Text>
          The number of all ICO's (Initial Coin Offerring) are{' '}
          <Text as='span' fontWeight={'bold'} color='gray.600'>
            {globalMarketData?.ended_icos}.
          </Text>
        </Text>
      </Text>
    </Flex>
  )
}

export default GlobalMarketData