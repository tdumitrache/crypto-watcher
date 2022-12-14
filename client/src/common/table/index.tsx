import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import LineChart from 'common/chart';
import { FC, useMemo } from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { Cell, Column, usePagination, useSortBy, useTable } from 'react-table';
import { ICryptocurrency } from 'types/coins';
import { formatCurrency } from 'utilities/formatCurrency';

interface CryptoTableProps<T> {
  columns: Column[];
  rows: T[];
}

const CryptoTable: FC<CryptoTableProps<ICryptocurrency>> = ({
  columns,
  rows,
}) => {
  const columnsData = useMemo(() => columns, [columns]);
  const rowsData = useMemo(
    () =>
      rows.map((row) => {
        return {
          id: row.id,
          market_cap_rank: row.market_cap_rank,
          name: {
            image: row.image,
            name: row.name,
            symbol: row.symbol,
            id: row.id,
          },
          price: row.current_price,
          price_change_percentage_1h_in_currency:
            row.price_change_percentage_1h_in_currency,
          price_change_percentage_24h_in_currency:
            row.price_change_percentage_24h_in_currency,
          price_change_percentage_7d_in_currency:
            row.price_change_percentage_7d_in_currency,
          market_cap: row.market_cap,
          total_volume: row.total_volume,
          circulating_supply: {
            max_supply: row.max_supply,
            circulating_supply: row.circulating_supply,
            symbol: row.symbol,
          },
          sparkline_in_7d: {
            price: row.sparkline_in_7d.price,
            symbol: row.symbol,
          },
        };
      }),
    [rows]
  );

  const tableInstance = useTable(
    {
      columns: columnsData,
      data: rowsData,
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,

    state,
  } = tableInstance;

  const createPages = (count: number) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize } = state;

  const getContentByColumnHeader = (header: string, cell: Cell) => {
    let content;

    switch (header) {
      case 'name':
        content = (
          <Stack direction='row' align='center' spacing='6px'>
            <Image
              src={cell.value.image}
              alt={`${cell.value.name} logo`}
              w='24px'
              h='24px'
            />
            <Text
              fontSize='14px'
              fontWeight={'bold'}
              color='gray.700'
              minW='fit-content'
            >
              {cell.value.name}
            </Text>
            <Text fontSize='14px' fontWeight={'700'} color='gray.400'>
              {cell.value.symbol.toUpperCase()}
            </Text>
          </Stack>
        );
        break;
      case '1h %':
        content = (
          <Stack direction='row' spacing='2px' align='center'>
            <Icon
              as={cell.value > 0 ? TiArrowSortedUp : TiArrowSortedDown}
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
              w='16px'
              h='16px'
            />
            <Text
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
            >{`${cell.value.toFixed(2)}%`}</Text>
          </Stack>
        );
        break;
      case '24h %':
        content = (
          <Stack direction='row' spacing='2px' align='center'>
            <Icon
              as={cell.value > 0 ? TiArrowSortedUp : TiArrowSortedDown}
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
              w='16px'
              h='16px'
            />
            <Text
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
            >{`${cell.value.toFixed(2)}%`}</Text>
          </Stack>
        );
        break;
      case '7d %':
        content = (
          <Stack direction='row' spacing='2px' align='center'>
            <Icon
              as={cell.value > 0 ? TiArrowSortedUp : TiArrowSortedDown}
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
              w='16px'
              h='16px'
            />
            <Text
              color={cell.value > 0 ? 'green.300' : 'red.300'}
              fontWeight='bold'
            >{`${cell.value.toFixed(2)}%`}</Text>
          </Stack>
        );
        break;
      case '#':
        content = (
          <Stack direction='row' align='center'>
            <Icon as={AiOutlineStar} cursor={'pointer'} />
            <Text fontSize='14px' fontWeight={'bold'} color='gray.500'>
              {cell.value}
            </Text>
          </Stack>
        );
        break;
      case 'circulating supply':
        content = (
          <Stack direction='column'>
            <Text
              fontSize='14px'
              fontWeight={'bold'}
              color='gray.700'
            >{`${cell.value.circulating_supply.toLocaleString(
              'en-us'
            )} ${cell.value.symbol.toUpperCase()}`}</Text>
            {cell.value.max_supply && (
              <Progress
                value={Number(
                  (cell.value.circulating_supply * 100) / cell.value.max_supply
                )}
                size='xs'
                borderRadius='12px'
                colorScheme='blue'
              />
            )}
          </Stack>
        );
        break;
      case 'last 7 days':
        const last7DaysArr: string[] = [];

        for (let i = 1; i <= 7; i++) {
          const day = new Date();
          day.setDate(day.getDate() - i);

          last7DaysArr.push(day.toDateString());
        }

        const chartData = cell.value.price
          .filter((_: number, idx: number) => (idx + 1) % 24 === 0)
          .map((item: number) => item.toFixed(2));

        content = (
          <Box minW={'350px'} maxH='120px'>
            <LineChart
              chartData={[
                {
                  name: cell.value.symbol.toUpperCase(),
                  data: chartData,
                },
              ]}
              chartOptions={{
                xaxis: {
                  categories: last7DaysArr.reverse(),
                  labels: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                colors: [
                  `${
                    chartData[0] - chartData[chartData.length - 1] <= 0
                      ? '#4FD1C5'
                      : '#f02b3d'
                  }`,
                ],
                fill: {
                  colors: [
                    `${
                      chartData[0] - chartData[chartData.length - 1] <= 0
                        ? '#4FD1C5'
                        : '#f02b3d'
                    }`,
                  ],
                },
              }}
            />
          </Box>
        );

        break;
      default:
        content = (
          <Text fontWeight={'bold'} color='gray.700'>
            {formatCurrency(cell.value)}
          </Text>
        );
        break;
    }
    return content;
  };

  return (
    <>
      <Flex
        my='24px'
        direction='column'
        w='100%'
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Stack
          direction='row'
          spacing='12px'
          align='center'
          my='24px'
          px='22px'
        >
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            color='gray.500'
            size='sm'
            borderRadius='12px'
            maxW='75px'
            cursor='pointer'
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
          </Select>
          <Text fontSize='xs' color='gray.600' fontWeight='600'>
            entries per page
          </Text>
        </Stack>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => {
                  return (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      minW={column.Header === 'Last 7 days' ? '250px' : '100%'}
                    >
                      <Flex
                        justify='space-between'
                        align='center'
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color='black'
                        textTransform={'capitalize'}
                        fontFamily={'Inter'}
                      >
                        {column.render('Header')}
                        <Icon
                          w={{ sm: '10px', md: '14px' }}
                          h={{ sm: '10px', md: '14px' }}
                          color={'black'}
                          float='right'
                          as={
                            column.isSorted
                              ? column.isSortedDesc
                                ? TiArrowSortedDown
                                : TiArrowSortedUp
                              : TiArrowUnsorted
                          }
                        />
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  key={index}
                  _hover={{ background: '#f4f4f4' }}
                >
                  {row.cells.map((cell, index) => {
                    const content = getContentByColumnHeader(
                      cell.column.Header?.toString().toLocaleLowerCase()!,
                      cell
                    );
                    return (
                      <Td
                        {...cell.getCellProps()}
                        fontSize={{ sm: '14px' }}
                        key={index}
                        px={
                          cell.column.Header === 'Last 7 days' ? '0px' : '20px'
                        }
                        py='0px'
                      >
                        <Link to={`/currencies/${row.values.name.id}`}>
                          {content}
                        </Link>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction={{ sm: 'column', md: 'row' }}
          w='100%'
          justify='space-between'
          align='center'
          px={{ md: '22px' }}
        >
          <Text
            fontSize='sm'
            color='gray.500'
            fontWeight='normal'
            mb={{ sm: '24px', md: '0px' }}
          >
            Showing {pageSize * pageIndex + 1} to{' '}
            {pageSize * (pageIndex + 1) <= rows.length
              ? pageSize * (pageIndex + 1)
              : rows.length}{' '}
            of {rows.length} entries
          </Text>
          <Stack direction='row' alignSelf='flex-end' spacing='4px' ms='auto'>
            <Button
              variant='no-hover'
              onClick={() => previousPage()}
              transition='all .5s ease'
              w='40px'
              h='40px'
              borderRadius='50%'
              bg='#fff'
              border='1px solid lightgray'
              display={
                pageSize === 5 ? 'none' : canPreviousPage ? 'flex' : 'none'
              }
              _hover={{
                bg: 'gray.200',
                opacity: '0.7',
                borderColor: 'gray.500',
              }}
            >
              <Icon as={GrFormPrevious} w='16px' h='16px' color='gray.400' />
            </Button>
            {pageSize === 5 ? (
              <NumberInput
                max={pageCount - 1}
                min={1}
                w='75px'
                mx='6px'
                defaultValue='1'
                onChange={(e) => gotoPage(Number(e))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={() => nextPage()} />
                  <NumberDecrementStepper onClick={() => previousPage()} />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              createPages(pageCount).map((pageNumber, index) => {
                return (
                  <Button
                    variant='no-hover'
                    transition='all .5s ease'
                    onClick={() => gotoPage(pageNumber - 1)}
                    w='40px'
                    h='40px'
                    borderRadius='160px'
                    bg={pageNumber === pageIndex + 1 ? 'blue.500' : '#fff'}
                    border='1px solid lightgray'
                    _hover={{
                      bg: 'gray.200',
                      opacity: '0.7',
                      borderColor: 'gray.500',
                    }}
                    key={index}
                  >
                    <Text
                      fontSize='sm'
                      color={pageNumber === pageIndex + 1 ? '#fff' : 'gray.600'}
                    >
                      {pageNumber}
                    </Text>
                  </Button>
                );
              })
            )}
            <Button
              variant='no-hover'
              onClick={() => nextPage()}
              transition='all .5s ease'
              w='40px'
              h='40px'
              borderRadius='160px'
              bg='#fff'
              border='1px solid lightgray'
              display={pageSize === 5 ? 'none' : canNextPage ? 'flex' : 'none'}
              _hover={{
                bg: 'gray.200',
                opacity: '0.7',
                borderColor: 'gray.500',
              }}
            >
              <Icon as={GrFormNext} w='16px' h='16px' color='gray.400' />
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default CryptoTable;
