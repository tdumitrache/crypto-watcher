import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Grid,
  Icon,
  Image,
  Link as ChakraLink,
  Progress,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  ErrorBadge,
  PrimaryBadge,
  SecondaryBadge,
  SuccessBadge,
} from 'common/badges';
import Separator from 'common/separators';
import { FC } from 'react';
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineRight,
  AiOutlineStar,
} from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import { FiExternalLink, FiLink } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ICoinData } from 'types/coins';
import { formatCurrency } from 'utilities/formatCurrency';

interface HeaderProps {
  data: ICoinData;
}

const Header: FC<HeaderProps> = ({ data }) => {
  const { homepage, blockchain_site, subreddit_url, repos_url } = data.links;

  return (
    <Container maxW={'1440px'} my='24px'>
      <Stack direction='column' spacing='24px'>
        <Breadcrumb
          spacing='8px'
          mb='12px'
          separator={
            <Icon as={AiOutlineRight} w='8px' h='8px' color='gray.500' />
          }
        >
          <BreadcrumbItem>
            <Link to='/'>
              <BreadcrumbLink href='#' fontSize='12px' color='gray.500'>
                Cryptocurrencies
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/'>
              <BreadcrumbLink href='#' fontSize='12px' color='gray.500'>
                Coins
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Text fontSize='12px' color='gray.600' fontWeight={'bold'}>
              {data.name}
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Grid templateColumns={'1fr 2fr'} gap='24px'>
          <Stack direction='column' spacing='12px'>
            <Stack direction='row' spacing='12px' align='center'>
              <Image src={data.image.small} w='36px' h='36px' />
              <Text color='gray.700' fontWeight={'bold'} fontSize='32px'>
                {data.name}
              </Text>
              <PrimaryBadge content={data.symbol} />
              <Tooltip
                hasArrow
                label='Add to Main Watchlist'
                bg='#333'
                color='#fff'
                borderRadius='12px'
              >
                <Flex
                  justify='center'
                  align='center'
                  borderRadius='8px'
                  p='6px'
                  border={'1px solid rgb(207, 214, 228)'}
                  cursor='pointer'
                >
                  <Icon as={AiOutlineStar} w='16px' h='16px' color='gray.500' />
                </Flex>
              </Tooltip>
            </Stack>
            <Stack direction='row' align='center' spacing='12px'>
              <SecondaryBadge
                content={`Rank #${data.market_cap_rank}`}
                textTransform={'capitalize'}
              />
              <PrimaryBadge content='Coin' textTransform='capitalize' />
              <PrimaryBadge
                content={`On ${data.community_data.twitter_followers.toLocaleString(
                  'en-us'
                )} watchlist`}
                textTransform='capitalize'
              />
            </Stack>

            <Stack
              direction={'row'}
              align='center'
              gap='4px'
              maxW='400px'
              flexWrap='wrap'
              flex='1 1 1'
              mt='50px !important'
            >
              <PrimaryBadge
                content={
                  <ChakraLink href={homepage[0]} target='_blank'>
                    <Stack direction='row' spacing='4px' align='center'>
                      <Icon as={FiLink} color='gray.500' w='10px' h='10px' />
                      <Text>Homepage</Text>
                      <Icon
                        as={FiExternalLink}
                        color='gray.500'
                        w='10px'
                        h='10px'
                      />
                    </Stack>
                  </ChakraLink>
                }
                textTransform='capitalize'
              />
              <PrimaryBadge
                content={
                  <ChakraLink href={blockchain_site[0]} target='_blank'>
                    <Stack direction='row' spacing='4px' align='center'>
                      <Icon as={FiLink} color='gray.500' w='10px' h='10px' />
                      <Text>Blockchain Site</Text>
                      <Icon
                        as={FiExternalLink}
                        color='gray.500'
                        w='10px'
                        h='10px'
                      />
                    </Stack>
                  </ChakraLink>
                }
                textTransform='capitalize'
              />
              <PrimaryBadge
                content={
                  <ChakraLink href={subreddit_url[0]} target='_blank'>
                    <Stack direction='row' spacing='4px' align='center'>
                      <Icon as={FiLink} color='gray.500' w='10px' h='10px' />
                      <Text>Reddit</Text>
                      <Icon
                        as={FiExternalLink}
                        color='gray.500'
                        w='10px'
                        h='10px'
                      />
                    </Stack>
                  </ChakraLink>
                }
                textTransform='capitalize'
              />
              <PrimaryBadge
                content={
                  <ChakraLink href={repos_url.github[0]} target='_blank'>
                    <Stack direction='row' spacing='4px' align='center'>
                      <Icon as={FiLink} color='gray.500' w='10px' h='10px' />
                      <Text>Source Code</Text>
                      <Icon
                        as={FiExternalLink}
                        color='gray.500'
                        w='10px'
                        h='10px'
                      />
                    </Stack>
                  </ChakraLink>
                }
                textTransform='capitalize'
              />
            </Stack>
            <Stack direction='column' spacing='12px' align='flex-start'>
              <Text fontSize='12px' color='gray.500' fontWeight={'bold'}>
                Tags:
              </Text>
              <Stack direction='row' align='center' spacing='12px'>
                {data.hashing_algorithm && (
                  <PrimaryBadge content={data.hashing_algorithm} />
                )}
                <PrimaryBadge
                  content={'Cryptocurrency'}
                  textTransform='capitalize'
                />
                <PrimaryBadge content={'Finance'} textTransform='capitalize' />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='column' spacing='12px' h='100%'>
            <Stack direction='column' spacing='12px'>
              <Text fontSize='12px' fontWeight={'bold'}>{`${
                data.name
              } Price (${data.symbol.toUpperCase()})`}</Text>
              <Stack direction='row' align='center' spacing='12px'>
                <Text
                  color='black'
                  fontSize='32px'
                  fontWeight={'bolder'}
                  lineHeight='42px'
                >
                  {formatCurrency(data.market_data.current_price.usd)}
                </Text>
                {data.market_data.price_change_percentage_24h < 0 ? (
                  <ErrorBadge
                    content={
                      <Stack direction='row' align='center' spacing='4px'>
                        <Icon
                          as={AiFillCaretDown}
                          w='12px '
                          h='12px'
                          color='#fff'
                          fontWeight={'bold'}
                        />
                        <Text
                          color='#fff'
                          fontSize='14px'
                          fontWeight={'bold'}
                        >{`${Math.abs(
                          Number(
                            data.market_data.price_change_percentage_24h.toFixed(
                              2
                            )
                          )
                        )} %`}</Text>
                      </Stack>
                    }
                  />
                ) : (
                  <SuccessBadge
                    content={
                      <Stack direction='row' align='center' spacing='4px'>
                        <Icon
                          as={AiFillCaretUp}
                          w='12px'
                          h='12px'
                          color='#fff'
                          fontWeight={'bold'}
                        />
                        <Text
                          color='#fff'
                          fontSize='14px'
                          fontWeight={'bold'}
                        >{`${Math.abs(
                          Number(
                            data.market_data.price_change_percentage_24h.toFixed(
                              2
                            )
                          )
                        )} %`}</Text>
                      </Stack>
                    }
                  />
                )}
              </Stack>

              <Stack direction='row' align='center' spacing='12px'>
                <Text
                  fontSize='14px'
                  color='gray.400'
                  fontWeight='bold'
                >{`${data.market_data.current_price.eth.toFixed(2)} ETH`}</Text>
                <Stack direction='row' align='center' spacing='4px'>
                  <Icon
                    as={
                      data.market_data.price_change_24h_in_currency.eth < 0
                        ? AiFillCaretDown
                        : AiFillCaretUp
                    }
                    w='12px'
                    h='12px'
                    color={
                      data.market_data.price_change_24h_in_currency.eth < 0
                        ? '#ea3943'
                        : '#16c784'
                    }
                  />
                  <Text
                    color={
                      data.market_data.price_change_24h_in_currency.eth < 0
                        ? '#ea3943'
                        : '#16c784'
                    }
                    fontWeight='bold'
                    fontSize='14px'
                  >
                    {`${data.market_data.price_change_24h_in_currency.eth.toFixed(
                      2
                    )} %`}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction='row' align='center' spacing='12px'>
                <Text color='gray.500' fontSize='12px'>
                  Low:{' '}
                  <Text as={'span'} color='gray.700' fontWeight='bold'>
                    {formatCurrency(
                      Number(data.market_data.low_24h.usd.toFixed(2))
                    )}
                  </Text>
                </Text>
                <Progress
                  value={
                    (data.market_data.low_24h.usd * 100) /
                    data.market_data.high_24h.usd
                  }
                  colorScheme='gray'
                  w='170px'
                  size='xs'
                  borderRadius={'8px'}
                />
                <Text color='gray.500' fontSize='12px'>
                  High:{' '}
                  <Text as={'span'} color='gray.700' fontWeight='bold'>
                    {formatCurrency(
                      Number(data.market_data.high_24h.usd.toFixed(2))
                    )}
                  </Text>
                </Text>
                <SecondaryBadge
                  content='24h'
                  textTransform='lowercase'
                  fontSize='10px'
                />
              </Stack>
            </Stack>
            <Separator
              variant='horizontal'
              mt='12px !important'
              mb='6px !important'
            />

            <Stack direction='row' spacing='36px' py='24px'>
              <Stack direction={'column'} spacing='4px' align={'start'}>
                <Stack direction='row' spacing='6px' align='center' mb='6px'>
                  <Text fontSize='12px' color='gray.700' fontWeight={'700'}>
                    Market Cap
                  </Text>
                  <Tooltip
                    hasArrow
                    shouldWrapChildren
                    label={
                      <Text>
                        The total market value of a cryptocurrency's circulating
                        supply. It is analogous to the free-float capitalization
                        in the stock market.
                        <br />
                        <br />
                        Market Cap = Current Price x Circulating Supply.
                      </Text>
                    }
                    bg='#fff'
                    fontSize='10px'
                    color='#333'
                    borderRadius='12px'
                    p='12px'
                    fontWeight='bold'
                    boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
                  >
                    <Icon
                      as={BsInfoCircleFill}
                      color='gray.600'
                      w='14px'
                      h='14px'
                    />
                  </Tooltip>
                </Stack>
                <Text fontWeight={'bold'} color='gray.700' fontSize='12px'>
                  {formatCurrency(data.market_data.market_cap.usd)}
                </Text>
                <Stack align='center' direction='row' spacing='4px'>
                  {data.market_data.price_change_percentage_24h < 0 ? (
                    <>
                      <Icon
                        as={AiFillCaretDown}
                        w='12px'
                        h='12px'
                        color={'#ea3943'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#ea3943'}
                        fontSize='12px'
                      >
                        {`${data.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}%`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        as={AiFillCaretUp}
                        w='12px'
                        h='12px'
                        color={'#16c784'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#16c784'}
                        fontSize='12px'
                      >
                        {`${data.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}%`}
                      </Text>
                    </>
                  )}
                </Stack>
              </Stack>
              <Separator variant='vertical' h='150px' />
              <Stack direction={'column'} spacing='4px' align={'start'}>
                <Stack direction='row' spacing='6px' align='center' mb='6px'>
                  <Text fontSize='12px' color='gray.700' fontWeight={'700'}>
                    Fully Diluted Market Cap
                  </Text>
                  <Tooltip
                    hasArrow
                    shouldWrapChildren
                    label={
                      <Text>
                        The market cap if the max supply was in circulation.
                        <br />
                        <br />
                        Fully-diluted market cap (FDMC) = price x max supply. If
                        max supply is null, FDMC = price x total supply. if max
                        supply and total supply are infinite or not available,
                        fully-diluted market cap shows - -.
                      </Text>
                    }
                    bg='#fff'
                    fontSize='10px'
                    color='#333'
                    borderRadius='12px'
                    p='12px'
                    fontWeight='bold'
                    boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
                  >
                    <Icon
                      as={BsInfoCircleFill}
                      color='gray.600'
                      w='14px'
                      h='14px'
                    />
                  </Tooltip>
                </Stack>
                <Text fontWeight={'bold'} color='gray.700' fontSize='12px'>
                  {formatCurrency(data.market_data.fully_diluted_valuation.usd)}
                </Text>
                <Stack align='center' direction='row' spacing='4px'>
                  {data.market_data.price_change_percentage_24h < 0 ? (
                    <>
                      <Icon
                        as={AiFillCaretDown}
                        w='12px'
                        h='12px'
                        color={'#ea3943'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#ea3943'}
                        fontSize='12px'
                      >
                        {`${(
                          data.market_data.price_change_percentage_24h + 0.01
                        ).toFixed(2)}%`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        as={AiFillCaretUp}
                        w='12px'
                        h='12px'
                        color={'#16c784'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#16c784'}
                        fontSize='12px'
                      >
                        {`${(
                          data.market_data.price_change_percentage_24h + 0.01
                        ).toFixed(2)}%`}
                      </Text>
                    </>
                  )}
                </Stack>
              </Stack>
              <Separator variant='vertical' h='150px' />
              <Stack direction={'column'} spacing='4px' align={'start'}>
                <Stack direction='row' spacing='6px' align='center' mb='6px'>
                  <Text fontSize='12px' color='gray.700' fontWeight={'700'}>
                    Volume
                  </Text>
                  <PrimaryBadge content='24h' textTransform='lowercase' />
                  <Tooltip
                    hasArrow
                    shouldWrapChildren
                    label={
                      <Text>
                        A measure of how much of a cryptocurrency was traded in
                        the last 24 hours.
                      </Text>
                    }
                    bg='#fff'
                    fontSize='10px'
                    color='#333'
                    borderRadius='12px'
                    p='12px'
                    fontWeight='bold'
                    boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
                  >
                    <Icon
                      as={BsInfoCircleFill}
                      color='gray.600'
                      w='14px'
                      h='14px'
                    />
                  </Tooltip>
                </Stack>
                <Text fontWeight={'bold'} color='gray.700' fontSize='12px'>
                  {formatCurrency(data.market_data.total_volume.usd)}
                </Text>
                <Stack
                  align='center'
                  direction='row'
                  spacing='4px'
                  mb='24px !important'
                >
                  {data.market_data.price_change_percentage_7d_in_currency.usd <
                  0 ? (
                    <>
                      <Icon
                        as={AiFillCaretDown}
                        w='12px'
                        h='12px'
                        color={'#ea3943'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#ea3943'}
                        fontSize='12px'
                      >
                        {`${data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                          2
                        )}%`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Icon
                        as={AiFillCaretUp}
                        w='12px'
                        h='12px'
                        color={'#16c784'}
                      />
                      <Text
                        fontWeight={'bold'}
                        color={'#16c784'}
                        fontSize='12px'
                      >
                        {`${data.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                          2
                        )}%`}
                      </Text>
                    </>
                  )}
                </Stack>

                <Stack direction='column' spacing='4px'>
                  <Text fontSize='12px' color='gray.500' fontWeight={'700'}>
                    Volume / Market Cap
                  </Text>
                  <Text fontWeight={'bold'} color={'gray.700'} fontSize='12px'>
                    {(
                      data.market_data.total_volume.usd /
                      data.market_data.market_cap.usd
                    ).toFixed(5)}
                  </Text>
                </Stack>
              </Stack>
              <Separator variant='vertical' h='150px' />

              <Stack direction={'column'} spacing='4px' align={'start'}>
                <Stack direction='row' spacing='6px' align='center' mb='6px'>
                  <Text fontSize='12px' color='gray.700' fontWeight={'700'}>
                    Circulating Supply
                  </Text>
                  <Tooltip
                    hasArrow
                    shouldWrapChildren
                    label={
                      <Text>
                        The amount of coins that are circulating in the market
                        and are in public hands. It is analogous to the flowing
                        shares in the stock market.
                      </Text>
                    }
                    bg='#fff'
                    fontSize='10px'
                    color='#333'
                    borderRadius='12px'
                    p='12px'
                    fontWeight='bold'
                    boxShadow={'0px 7px 23px rgba(0, 0, 0, 0.05)'}
                  >
                    <Icon
                      as={BsInfoCircleFill}
                      color='gray.600'
                      w='14px'
                      h='14px'
                    />
                  </Tooltip>
                  <Icon as={MdVerified} color='#3861fb' w='15px' h='15px' />
                </Stack>
                <Stack
                  direction='row'
                  align='center'
                  justify='space-between'
                  w='100%'
                >
                  <Text fontWeight={'bold'} color='gray.700' fontSize='12px'>
                    {`${data.market_data.circulating_supply} ${data.symbol
                      .toString()
                      .toUpperCase()}`}
                  </Text>
                  <Text fontWeight={'bold'} color='gray.500' fontSize='12px'>
                    {`${(
                      data.market_data.circulating_supply /
                      data.market_data.max_supply
                    ).toFixed(2)} %`}
                  </Text>
                </Stack>

                <Stack direction='column' spacing='4px'>
                  <Text fontSize='12px' color='gray.500' fontWeight={'700'}>
                    Volume / Market Cap
                  </Text>
                  <Text fontWeight={'bold'} color={'gray.700'} fontSize='12px'>
                    {(
                      data.market_data.total_volume.usd /
                      data.market_data.market_cap.usd
                    ).toFixed(5)}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Header;
