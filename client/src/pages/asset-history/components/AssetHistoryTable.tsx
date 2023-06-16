import {
  Button,
  Flex,
  Icon,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FC } from "react";
import { Column } from "react-table";
import { ITransaction } from "pages/portfolio";
import { formatCurrency } from "utilities";

interface AssetHistoryTableProps {
  columns: Column[];
  rows: ITransaction[];
  symbol: string;
}

export const AssetsHistoryTable: FC<AssetHistoryTableProps> = ({
  rows,
  columns,
  symbol,
}) => {
  return (
    <TableContainer mt="24px">
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => {
              return (
                <Th
                  key={column["accessor"] as string}
                  color="rgb(34, 37, 49)"
                  textTransform={"capitalize"}
                  fontFamily={
                    "Inter,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif"
                  }
                >
                  {column["Header"] as string}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => {
            return (
              <Tr key={row.assetId}>
                <Td>
                  <Text fontSize={"14px"} fontWeight={"500"}>
                    {new Date(row.timestamp).toLocaleString()}
                  </Text>
                </Td>
                <Td>
                  <Text fontSize={"14px"} fontWeight={"500"}>
                    {formatCurrency(row.tokenPrice)}
                  </Text>
                </Td>
                <Td>
                  <Stack direction={"column"}>
                    <Text fontSize={"14px"} fontWeight={"500"}>
                      + {formatCurrency(row.buyPrice)}
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"500"}
                      color="rgb(22, 199, 132)"
                    >
                      + {(row.buyPrice / row.tokenPrice).toFixed(2)}{" "}
                      {symbol.toUpperCase()}
                    </Text>
                  </Stack>
                </Td>
                <Td>
                  <Text fontSize={"14px"} fontWeight={"500"}>
                    {(Math.random() * 0.001).toFixed(5)} {symbol.toUpperCase()}
                  </Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
