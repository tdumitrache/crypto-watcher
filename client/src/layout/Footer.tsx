import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Grid,
  Stack,
  Badge,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/chainlink.png';

const Footer = () => {
  return (
    <Flex
      direction='column'
      bg='rgb(255, 255, 255)'
      boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
      pt='48px'
      pb='38px'
    >
      <Container maxWidth='1440px'>
        <Flex direction='column'>
          <Flex direction='row' justify={'space-beetween'} align='center'>
            <Box
              cursor='pointer'
              display='flex'
              alignItems='center'
              alignSelf='flex-start'
              me='auto'
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
            <Grid templateColumns={'repeat(4, 1fr)'} gap='12px'>
              <Flex direction='column'>
                <Text
                  color='gray.700'
                  fontSize='16px'
                  fontWeight={'700'}
                  mb='16px'
                >
                  Products
                </Text>
                <Stack direction='column' spacing='10px'>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Blockchain Explorer
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Crypto API
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Crypto Indices
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Jobs Board
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Sitemap
                    </Text>
                  </Link>
                </Stack>
              </Flex>
              <Flex direction='column'>
                <Text
                  color='gray.700'
                  fontSize='16px'
                  fontWeight={'700'}
                  mb='16px'
                >
                  Company
                </Text>
                <Stack direction='column' spacing='10px'>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      About us
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Terms of use
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Privacy Policy
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Community Rules
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Disclaimer
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Methodology
                    </Text>
                  </Link>
                  <Stack direction='row' spacing='6px' align='center'>
                    <Link to='/'>
                      <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                        Careers
                      </Text>
                    </Link>
                    <Badge
                      background='rgb(56, 97, 251)'
                      p='2px 12px'
                      fontSize='10px'
                      borderRadius='15px'
                      color='#fff'
                    >
                      We're hiring!
                    </Badge>
                  </Stack>
                </Stack>
              </Flex>
              <Flex direction='column'>
                <Text
                  color='gray.700'
                  fontSize='16px'
                  fontWeight={'700'}
                  mb='16px'
                >
                  Support
                </Text>
                <Stack direction='column' spacing='10px'>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Request Form
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Contact Support
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      FAQ
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Glossary
                    </Text>
                  </Link>
                </Stack>
              </Flex>
              <Flex direction='column'>
                <Text
                  color='gray.700'
                  fontSize='16px'
                  fontWeight={'700'}
                  mb='16px'
                >
                  Socials
                </Text>
                <Stack direction='column' spacing='10px'>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Facebook
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Twitter
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Telegram
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Instagram
                    </Text>
                  </Link>
                  <Link to='/'>
                    <Text fontSize='14px' color='gray.500' fontWeight={'500'}>
                      Interactive Chat
                    </Text>
                  </Link>
                </Stack>
              </Flex>
            </Grid>
          </Flex>
          <Text fontSize='14px' fontWeight='700' color='gray.500' mt='12px'>
            © {new Date().getFullYear()} Crypto Watcher. All rights reserved
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Footer;
