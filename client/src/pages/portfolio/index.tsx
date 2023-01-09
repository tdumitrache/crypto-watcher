import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Flex,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { PrimaryBadge, SuccessBadge } from 'common/badges';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'utilities/formatCurrency';
import AssetsTable from './components/AssetsTable';

export interface IAssetsRow {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  price24h: number;
  transactions: {
    tokenPrices: number[];
    buyPrices: number[];
  };
}

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Price',
    accessor: 'price',
  },
  {
    Header: '24h %',
    accessor: 'price_change_percentage_24h_in_currency',
  },
  {
    Header: 'Holdings',
    accessor: 'holdings',
  },
  {
    Header: 'Avg. Buy Price',
    accessor: 'avg_buy_price',
  },
  {
    Header: 'Profit/Loss',
    accessor: 'profit/loss',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
  },
];

const rows: IAssetsRow[] = [
  {
    id: 'cosmos',
    name: 'atom',
    symbol: 'ATOM',
    image: '',
    price: 9.34,
    price24h: 0.06,
    transactions: {
      tokenPrices: [15.97, 10.2, 10, 17.82, 17.79, 28, 28.5],
      buyPrices: [-90, -30.6, 70, 17.82, 72.05, 138.6, 28.5],
    },
  },
];

const Portfolio = () => {
  return (
    <Container maxW='1440px'>
      <Stack direction='column' spacing='8px'>
        <Breadcrumb
          spacing='8px'
          separator={<MdChevronRight color='gray.500' />}
          my='12px'
        >
          <BreadcrumbItem>
            <Link to='/'>
              <Text fontSize='12px'>Home</Text>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Text color='#333' fontWeight={'bold'} fontSize='12px'>
              Portfolio
            </Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex direction='column'>
          <Text fontSize='12px' color='rgb(88, 102, 126)'>
            Current Balance
          </Text>
          <Flex direction='row' align='center' gap='12px'>
            <Text
              fontSize='32px'
              fontWeight={'bold'}
              lineHeight={'1.5'}
              wordBreak='break-all'
              color='#000'
            >
              {formatCurrency(5000)}
            </Text>
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
                  >{`${Math.abs(10)} %`}</Text>
                </Stack>
              }
            />
          </Flex>
        </Flex>
        <Stack direction='row' align='center' spacing='8px'>
          <Icon
            as={1 < 0 ? AiFillCaretDown : AiFillCaretUp}
            w='12px'
            h='12px'
            color={1 < 0 ? '#ea3943' : '#16c784'}
          />
          <Text
            color={1 < 0 ? '#ea3943' : '#16c784'}
            fontWeight='bold'
            fontSize='14px'
          >
            {`10 %`}
          </Text>
          <PrimaryBadge content='24h' textTransform='lowercase' />
        </Stack>
        <Flex direction='column' mt='32px !important'>
          <Text fontSize='24px' color='#000' fontWeight={'bold'}>
            Your Assets
          </Text>
          <AssetsTable rows={rows} columns={columns} />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Portfolio;
