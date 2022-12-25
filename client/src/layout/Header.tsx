import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import logo from 'assets/images/chainlink.png';
import { SecondaryButton } from 'common/buttons';
import PrimaryButton from 'common/buttons/PrimaryButton';
import TransparentIconButon from 'common/buttons/TransparentIconButon';
import Separator from 'common/separators';
import { AiFillPieChart, AiFillStar } from 'react-icons/ai';
import { BsFillSunFill } from 'react-icons/bs';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { RiGasStationFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { EthGasMenu } from './components';
import { useQuery } from 'react-query';
import SearchCoins from './components/search-coins';
import { getGlobalMarketData } from 'api/coins';
import LoadingSpinner from 'common/loading-spinner';
import { formatCurrency } from 'utilities/formatCurrency';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { data: globalMarketData, isFetching: isFetchingGlobalMarketData } =
    useQuery('globalMarketData', () => getGlobalMarketData());

  if (isFetchingGlobalMarketData) {
    return <LoadingSpinner size={150} />;
  }

  return (
    <Flex
      direction='column'
      bg='rgb(255, 255, 255)'
      boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
    >
      <Container maxWidth='1440px'>
        <Stack
          direction='row'
          align={'center'}
          justify='space-beetween'
          py='4px'
        >
          <Stack align='center' spacing={'12px'} direction='row' me='auto'>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Cryptos
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                {globalMarketData?.active_cryptocurrencies}
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Exchanges
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                {globalMarketData?.markets}
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Market Cap
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                {formatCurrency(globalMarketData?.total_market_cap?.usd!)}
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                24h Vol
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                {formatCurrency(globalMarketData?.total_volume?.usd)}
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Dominance:
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                BTC: {globalMarketData?.market_cap_percentage?.btc.toFixed(2)}%
                ETH: {globalMarketData?.market_cap_percentage?.eth.toFixed(2)}%
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Icon as={RiGasStationFill} />
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                ETH Gas:
              </Text>
              <EthGasMenu />
            </Stack>
          </Stack>
          <Stack align='center' direction='row' spacing='10px'>
            <IconButton
              aria-label='toggle-color-mode'
              onClick={toggleColorMode}
              icon={
                colorMode === 'light' ? (
                  <MdOutlineNightlightRound />
                ) : (
                  <BsFillSunFill />
                )
              }
            />
            <Separator variant='vertical' mx='12px' />
            <Stack direction='row' align='center' spacing='6px'>
              <SecondaryButton label='Log In' onClick={() => {}} />
              <PrimaryButton label='Sign Up' onClick={() => {}} />
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Separator variant='horizontal' mt='4px' mb='6px' />
      <Container maxWidth={'1440px'}>
        <Stack
          direction='row'
          align='center'
          justify='space-beetween'
          my='10px'
        >
          <Stack direction='row' align='center' spacing='26px' me='auto'>
            <Link to='/'>
              <Box
                cursor='pointer'
                display='flex'
                alignItems='center'
                me='12px'
              >
                <Image src={logo} w='36px' h='36px' me='6px' />
                <Text
                  color='blue.500'
                  fontWeight={'bold'}
                  fontSize='18px'
                  className='logo-title'
                >
                  CRYPTO WATCHER
                </Text>
              </Box>
            </Link>
            <Text
              fontSize='14px'
              cursor={'pointer'}
              fontWeight='bold'
              color='gray.700'
            >
              Cryptocurrencies
            </Text>
            <Text
              fontSize='14px'
              cursor={'pointer'}
              fontWeight='bold'
              color='gray.700'
            >
              Exchanges
            </Text>
            <Text
              fontSize='14px'
              cursor={'pointer'}
              fontWeight='bold'
              color='gray.700'
            >
              Community
            </Text>
            <Text
              fontSize='14px'
              cursor={'pointer'}
              fontWeight='bold'
              color='gray.700'
            >
              Products
            </Text>
            <Text
              fontSize='14px'
              cursor={'pointer'}
              fontWeight='bold'
              color='gray.700'
            >
              Learn
            </Text>
          </Stack>
          <Stack direction='row' align='center' spacing='6px'>
            <TransparentIconButon icon={AiFillStar} label='Watchlist' />
            <TransparentIconButon icon={AiFillPieChart} label='Portfolio' />
            <SearchCoins searchInput='' />
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;
