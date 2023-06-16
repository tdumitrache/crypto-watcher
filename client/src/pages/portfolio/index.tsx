import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { getCoinData } from "api/coins";
import { getUserTransactions } from "api/users";
import { PrimaryBadge, SuccessBadge } from "common/badges";
import { useEffect, useMemo, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { formatCurrency } from "utilities/formatCurrency";
import AssetsTable from "./components/AssetsTable";
import BuyCryptoModal from "./components/BuyCryptoModal";

export interface ITransaction {
  assetId: string;
  tokenPrice: number;
  buyPrice: number;
  timestamp: number;
}

export interface IAssetsRow {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  price24h: number;
  transactions: ITransaction[];
}

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "24h %",
    accessor: "price_change_percentage_24h_in_currency",
  },
  {
    Header: "Holdings",
    accessor: "holdings",
  },
  {
    Header: "Avg. Buy Price",
    accessor: "avg_buy_price",
  },
  {
    Header: "Profit/Loss",
    accessor: "profit/loss",
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];

const Portfolio = () => {
  const [rows, setRows] = useState<IAssetsRow[]>([]);

  const {
    isOpen: isOpenBuyModal,
    onOpen: onOpenBuyModal,
    onClose: onCloseBuyModal,
  } = useDisclosure();

  const { data: transactions, refetch: refetchUserTransactions } = useQuery<
    ITransaction[]
  >("getUserTransactions", () => getUserTransactions());

  useEffect(() => {
    transactions &&
      transactions.length &&
      transactions.forEach((transaction: ITransaction) => {
        const asset = rows.find((row) => row.id === transaction.assetId);

        if (!asset) {
          getCoinData(transaction.assetId).then((data) =>
            setRows((prevRows) => [
              ...prevRows,
              {
                id: data.id,
                name: data.name,
                image: data.image.small,
                symbol: data.symbol,
                price: data.market_data.current_price.usd,
                price24h: data.market_data.price_change_percentage_24h,
                transactions: [transaction],
              },
            ])
          );
        } else {
          setRows((prevRows) =>
            prevRows.map((row: IAssetsRow) => {
              if (row.id === asset.id) {
                return {
                  ...row,
                  transactions: { ...row.transactions, transaction },
                };
              }

              return row;
            })
          );
        }
      });
  }, [transactions, refetchUserTransactions]);

  const currentBalance = useMemo(() => {
    return (transactions ?? []).reduce((acc, tx) => {
      return acc + tx.buyPrice;
    }, 0);
  }, [transactions]);

  return (
    <>
      <Container maxW="1440px">
        <Stack direction="column" spacing="8px">
          <Breadcrumb
            spacing="8px"
            separator={<MdChevronRight color="gray.500" />}
            my="12px"
          >
            <BreadcrumbItem>
              <Link to="/">
                <Text fontSize="12px">Home</Text>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text color="#333" fontWeight={"bold"} fontSize="12px">
                Portfolio
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex direction="row" align="center" justify="space-between">
            <Flex direction="column">
              <Text fontSize="12px" color="rgb(88, 102, 126)">
                Current Balance
              </Text>
              <Flex direction="row" align="center" gap="12px">
                <Text
                  fontSize="32px"
                  fontWeight={"bold"}
                  lineHeight={"1.5"}
                  wordBreak="break-all"
                  color="#000"
                >
                  {formatCurrency(currentBalance)}
                </Text>
                <SuccessBadge
                  content={
                    <Stack direction="row" align="center" spacing="4px">
                      <Icon
                        as={AiFillCaretUp}
                        w="12px"
                        h="12px"
                        color="#fff"
                        fontWeight={"bold"}
                      />
                      <Text
                        color="#fff"
                        fontSize="14px"
                        fontWeight={"bold"}
                      >{`${Math.abs(10)} %`}</Text>
                    </Stack>
                  }
                />
              </Flex>
            </Flex>
            <Button
              leftIcon={<FaPlus />}
              colorScheme="blue"
              variant="solid"
              onClick={onOpenBuyModal}
            >
              Add New
            </Button>
          </Flex>
          <Stack direction="row" align="center" spacing="8px">
            <Icon
              as={1 < 0 ? AiFillCaretDown : AiFillCaretUp}
              w="12px"
              h="12px"
              color={1 < 0 ? "#ea3943" : "#16c784"}
            />
            <Text
              color={1 < 0 ? "#ea3943" : "#16c784"}
              fontWeight="bold"
              fontSize="14px"
            >
              {`10 %`}
            </Text>
            <PrimaryBadge content="24h" textTransform="lowercase" />
          </Stack>
          <Flex direction="column" mt="32px !important">
            <Text fontSize="24px" color="#000" fontWeight={"bold"}>
              Your Assets
            </Text>
            <AssetsTable
              rows={rows}
              columns={columns}
              transactions={transactions}
              refetchUserTransactions={refetchUserTransactions}
            />
          </Flex>
        </Stack>
      </Container>
      <BuyCryptoModal
        isOpenBuyModal={isOpenBuyModal}
        onCloseBuyModal={onCloseBuyModal}
      />
    </>
  );
};

export default Portfolio;
