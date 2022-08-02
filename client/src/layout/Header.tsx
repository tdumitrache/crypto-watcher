import { Link } from 'react-router-dom';
import {
  Stack,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  useDisclosure,
  Flex,
  Container,
  IconButton,
  InputGroup,
  InputLeftElement,
  Image,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import { EthGasMenu } from './components';
import { RiGasStationFill } from 'react-icons/ri';
import { MdOutlineNightlightRound } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import { AiFillStar, AiFillPieChart, AiOutlineSearch } from 'react-icons/ai';
import Separator from 'common/separators';
import PrimaryButton from 'common/buttons/PrimaryButton';
import { SecondaryButton } from 'common/buttons';
import SearchCoins from './components/search-coins';
import logo from 'assets/images/chainlink.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
                20.000
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Exchanges
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                499
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Market Cap
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                $1.074.011.482.189,427
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                24h Vol
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                $73.024.403.674,79
              </Text>
            </Stack>
            <Stack align='center' spacing='6px' direction={'row'}>
              <Text fontSize='xs' color='gray.700' fontWeight={'500'}>
                Dominance:
              </Text>
              <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
                BTC: 41.1% ETH: 18.8%
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
          <Stack direction='row' align='center' spacing='12px'>
            <Stack
              direction='row'
              align={'center'}
              spacing='4px'
              cursor={'pointer'}
            >
              <Icon as={AiFillStar} w='18px' h='18px' color='gray.400' />
              <Text fontSize='12px' color='gray.700' fontWeight={'bold'}>
                Watchlist
              </Text>
            </Stack>
            <Stack
              direction='row'
              align={'center'}
              spacing='4px'
              cursor={'pointer'}
              me='12px'
            >
              <Icon as={AiFillPieChart} w='18px' h='18px' color='gray.400' />
              <Text fontSize='12px' color='gray.700' fontWeight={'bold'}>
                Portfolio
              </Text>
            </Stack>
            <SearchCoins searchInput='' />
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Header;
