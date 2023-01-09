import { FC } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Image,
  Icon,
  Text,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  formatCurrency,
  getWeightedMean,
  getAmountByTransactions,
} from 'utilities';
import { IAssetsRow } from '../';
import { Column } from 'react-table';
import PriceChange from 'common/price-change';

interface AssetsTableProps {
  columns: Column[];
  rows: IAssetsRow[];
}

const AssetsTable: FC<AssetsTableProps> = ({ rows, columns }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {columns.map((column) => {
              return (
                <Th
                  key={column['accessor'] as string}
                  color='rgb(34, 37, 49)'
                  textTransform={'capitalize'}
                  fontFamily={
                    'Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif'
                  }
                >
                  {column['Header'] as string}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => {
            return (
              <Tr key={row.id}>
                <Td>
                  <Stack spacing='4px' direction={'row'}>
                    <Image src={row.image} w='24px' h='24px' />
                    <Text color='#000' fontSize='14px' fontWeight='bold'>
                      {row.name}
                    </Text>
                    <Text
                      color='rgb(128, 138, 157)'
                      fontSize='14px'
                      fontWeight='bold'
                      className='bold    bold-name'
                    >
                      {row.symbol}
                    </Text>
                  </Stack>
                </Td>
                <Td>
                  {' '}
                  <Text color='#000' fontSize='14px' fontWeight='bold'>
                    {formatCurrency(row.price)}
                  </Text>
                </Td>
                <Td>
                  <PriceChange percentage={row.price24h} />
                </Td>
                <Td>
                  <Flex direction={'column'} gap='4px'>
                    <Text color='#000' fontSize='14px' fontWeight='bold'>
                      {formatCurrency(
                        row.price *
                          getAmountByTransactions(
                            row.transactions.tokenPrices,
                            row.transactions.buyPrices
                          )
                      )}
                    </Text>
                    <Text
                      color='rgb(88, 102, 126)'
                      fontSize='14px'
                      fontWeight='bold'
                    >{`${getAmountByTransactions(
                      row.transactions.tokenPrices,
                      row.transactions.buyPrices
                    )} ${row.symbol}`}</Text>
                  </Flex>
                </Td>
                <Td>
                  {' '}
                  <Text color='#000' fontSize='14px' fontWeight='bold'>
                    {formatCurrency(
                      getWeightedMean(
                        row.transactions.tokenPrices,
                        [90, 30.6, 70, 17.82, 72.05, 138.6, 28.5]
                      )
                    )}
                  </Text>
                </Td>
                <Td>
                  <Stack direction='column'>
                    <Text color='#000' fontSize='14px' fontWeight='bold'>
                      {formatCurrency(
                        row.price *
                          getAmountByTransactions(
                            row.transactions.tokenPrices,
                            row.transactions.buyPrices
                          ) -
                          row.transactions.buyPrices.reduce(
                            (acc, el) => (acc += el)
                          )
                      )}
                    </Text>
                    <PriceChange percentage={0} />
                  </Stack>
                </Td>
                <Td>
                  <Button variant={'transparent'}>
                    <Icon
                      as={AiOutlinePlus}
                      w='32px'
                      h='32px'
                      color='rgb(166, 176, 195)'
                    />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AssetsTable;
