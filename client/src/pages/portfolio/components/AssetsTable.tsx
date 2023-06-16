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
import PriceChange from "common/price-change";
import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from "react";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { Column } from "react-table";
import { formatCurrency, getAmountByTransactions } from "utilities";
import { IAssetsRow, ITransaction } from "../";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { deleteAsset } from "api/users";

interface AssetsTableProps {
  columns: Column[];
  rows: IAssetsRow[];
  transactions?: ITransaction[];
  refetchUserTransactions: () => void;
}

const AssetsTable: FC<AssetsTableProps> = ({
  rows: rowsFromProps,
  columns,
  transactions = [],
  refetchUserTransactions,
}) => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<IAssetsRow[]>([]);

  const { mutate: mutateDeleteAsset } = useMutation(
    "deleteAsset",
    (id: string) => deleteAsset(id)
  );

  useEffect(() => {
    let transactions: IAssetsRow[] = [];

    for (let i = 0; i < rowsFromProps.length; i++) {
      const rowInTransaction = transactions.find(
        (transaction: IAssetsRow) => transaction.id === rowsFromProps[i].id
      );

      if (!rowInTransaction) {
        transactions.push(rowsFromProps[i]);
      } else {
        const overridedTransactions = [
          ...rowInTransaction.transactions.map((tx) => tx),
          ...rowsFromProps[i].transactions,
        ];
        transactions = transactions.map((tx) => {
          if (tx.id === rowInTransaction.id) {
            return {
              ...tx,
              transactions: overridedTransactions,
            };
          }
          return tx;
        });
      }
    }

    setRows(transactions);
  }, [rowsFromProps, mutateDeleteAsset, refetchUserTransactions]);

  const handleRowClick = (e: any, id: string) => {
    const userTransactions = transactions.filter((tx) => tx.assetId === id);

    navigate(`/portfolio/${id}`, { state: userTransactions });
  };

  const handleDeleteAsset = async (e: any, id: string) => {
    e.stopPropagation();

    await mutateDeleteAsset(id);

    setTimeout(() => refetchUserTransactions(), 500);
  };

  return (
    <TableContainer>
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
            const avgBuyPrice =
              row.transactions.reduce((acc, tx) => (acc += tx.tokenPrice), 0) /
              row.transactions.length;

            return (
              <Tr
                key={row.id}
                onClick={(e) => handleRowClick(e, row.id)}
                cursor="pointer"
                _hover={{ backgroundColor: "#f4f4f4" }}
              >
                <Td>
                  <Stack spacing="4px" direction={"row"}>
                    <Image src={row.image} w="24px" h="24px" />
                    <Text color="#000" fontSize="14px" fontWeight="bold">
                      {row.name}
                    </Text>
                    <Text
                      color="rgb(128, 138, 157)"
                      fontSize="14px"
                      fontWeight="bold"
                      className="bold    bold-name"
                    >
                      {row.symbol.toUpperCase()}
                    </Text>
                  </Stack>
                </Td>
                <Td>
                  {" "}
                  <Text color="#000" fontSize="14px" fontWeight="bold">
                    {formatCurrency(row.price)}
                  </Text>
                </Td>
                <Td>
                  <PriceChange percentage={row.price24h} />
                </Td>
                <Td>
                  <Flex direction={"column"} gap="4px">
                    <Text color="#000" fontSize="14px" fontWeight="bold">
                      {formatCurrency(
                        row.price *
                          getAmountByTransactions(
                            row.transactions.map((el) => el.tokenPrice),
                            row.transactions.map((el) => el.buyPrice)
                          )
                      )}
                    </Text>
                    <Text
                      color="rgb(88, 102, 126)"
                      fontSize="14px"
                      fontWeight="bold"
                    >{`${getAmountByTransactions(
                      row.transactions.map((el) => el.tokenPrice),
                      row.transactions.map((el) => el.buyPrice)
                    )} ${row.symbol}`}</Text>
                  </Flex>
                </Td>
                <Td>
                  {" "}
                  <Text color="#000" fontSize="14px" fontWeight="bold">
                    {formatCurrency(avgBuyPrice)}
                  </Text>
                </Td>
                <Td>
                  <Stack direction="column">
                    <Text color="#000" fontSize="14px" fontWeight="bold">
                      {formatCurrency(
                        row.price *
                          getAmountByTransactions(
                            row.transactions.map((el) => el.tokenPrice),
                            row.transactions.map((el) => el.buyPrice)
                          ) -
                          row.transactions
                            .map((el) => el.buyPrice)
                            .reduce((acc, el) => (acc += el))
                      )}
                    </Text>
                    <PriceChange percentage={0} />
                  </Stack>
                </Td>
                <Td>
                  <Button
                    variant={"transparent"}
                    zIndex={2023}
                    width="42px"
                    height="42px"
                    backgroundColor={"red"}
                    borderRadius={"50%"}
                    onClick={(e) => handleDeleteAsset(e, row.id)}
                  >
                    <Icon as={AiFillDelete} w="24px" h="24px" color="#fff" />
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
