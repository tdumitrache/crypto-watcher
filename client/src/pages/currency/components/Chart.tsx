import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { AdvancedChart } from 'react-tradingview-embed';
import { ICoinData } from 'types/coins';

interface ChartProps {
  data: ICoinData;
}

const Chart: FC<ChartProps> = ({ data }) => {
  return (
    <Box w='100%'>
      <Container maxW={'1440px'} my='24px' mx='auto'>
        <Text fontSize='24px' fontWeight={'bold'} mb='24px'>
          {data.name} to USD Chart
        </Text>
        <Stack direction='column' spacing='24px'>
          <AdvancedChart
            widgetProps={{ theme: 'light', symbol: `${data.symbol}USD` }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default Chart;
