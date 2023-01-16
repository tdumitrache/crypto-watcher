import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getGlobalMarketData } from 'api/coins';
import logo from 'assets/images/chainlink.png';
import { SecondaryButton } from 'common/buttons';
import PrimaryButton from 'common/buttons/PrimaryButton';
import TransparentIconButon from 'common/buttons/TransparentIconButon';
import LoadingSpinner from 'common/loading-spinner';
import Separator from 'common/separators';
import { AuthContext } from 'context/AuthContext';
import { useContext, useEffect } from 'react';
import { AiFillPieChart } from 'react-icons/ai';
import { RiGasStationFill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'utilities/formatCurrency';
import { EthGasMenu } from './components';
import { LoginModal, SignInModal } from './components/modals';
import { getUserProfile } from 'api/users';
import SearchCoins from './components/search-coins';

const Header = () => {
  const { token, setToken, isAuthenticated } = useContext(AuthContext);
  const {
    isOpen: isLoginModalOpen,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();
  const {
    isOpen: isSignInModalOpen,
    onOpen: onOpenSignInModal,
    onClose: onCloseSignInModal,
  } = useDisclosure();

  const { data: globalMarketData, isFetching: isFetchingGlobalMarketData } =
    useQuery('globalMarketData', () => getGlobalMarketData());

  const { data: profileData, refetch: refetchProfileData } = useQuery(
    `getUserProfile/${token}`,
    () => getUserProfile()
  );

  useEffect(() => {
    refetchProfileData();
  }, [token, refetchProfileData]);

  if (isFetchingGlobalMarketData) {
    return <LoadingSpinner size={150} />;
  }

  return (
    <>
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
                  BTC: {globalMarketData?.market_cap_percentage?.btc.toFixed(2)}
                  % ETH:{' '}
                  {globalMarketData?.market_cap_percentage?.eth.toFixed(2)}%
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
              <Separator variant='vertical' mx='12px' />
              {isAuthenticated ? (
                <Stack direction='row' align='center' spacing='24px'>
                  <Text fontSize='14px' fontWeight={'bold'}>
                    {profileData &&
                      profileData.name &&
                      `Welcome, ${profileData.name.split(' ')[0]}!`}
                  </Text>
                  <SecondaryButton
                    label='Log Out'
                    onClick={() => setToken('')}
                  />
                </Stack>
              ) : (
                <Stack direction='row' align='center' spacing='6px'>
                  <SecondaryButton label='Log In' onClick={onOpenLoginModal} />
                  <PrimaryButton label='Sign Up' onClick={onOpenSignInModal} />
                </Stack>
              )}
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
              <Link to={'/portfolio'}>
                <TransparentIconButon icon={AiFillPieChart} label='Portfolio' />
              </Link>
              <SearchCoins searchInput='' />
            </Stack>
          </Stack>
        </Container>
      </Flex>
      <LoginModal
        isLoginModalOpen={isLoginModalOpen}
        onCloseLoginModal={onCloseLoginModal}
      />
      <SignInModal
        isSignInModalOpen={isSignInModalOpen}
        onCloseSignInModal={onCloseSignInModal}
      />
    </>
  );
};

export default Header;
