import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getCoinData } from "api/coins";
import PriceChange from "common/price-change";
import { ITransaction } from "pages/portfolio";
import React, { useMemo } from "react";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { formatCurrency } from "utilities";
import { AssetsHistoryTable } from "./components";

const columns = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "amount",
    accessor: "amount",
  },
  {
    Header: "Fees",
    accessor: "fees",
  },
];

const AssetHistory = () => {
  const { id } = useParams();
  const location = useLocation();

  const transactions = location.state as ITransaction[];

  const { data: coinData } = useQuery(`getCoinData/${id}`, () =>
    getCoinData(id ?? "bitcoin")
  );

  const assetBalance = useMemo(
    () => transactions.reduce((acc, tx) => (acc += tx.buyPrice), 0),
    [transactions]
  );

  const assetQuantity = useMemo(
    () =>
      transactions.reduce((acc, tx) => (acc += tx.buyPrice / tx.tokenPrice), 0),
    [transactions]
  );

  const totalBuyPrice = useMemo(
    () => transactions.reduce((acc, tx) => (acc += tx.tokenPrice), 0),
    [transactions]
  );

  console.log("coinData: ", coinData);

  console.log(transactions);

  return (
    <>
      <Container maxW="1440px">
        <Stack direction="column" spacing="8px" py="24px">
          <Stack spacing="8px">
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
                <Link to="/portfolio">
                  <Text fontSize="12px">Portfolio</Text>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <Text color="#333" fontWeight={"bold"} fontSize="12px">
                  {id?.toUpperCase()}
                </Text>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
          <Text fontSize="14px" color="gray" mb="6px">
            {coinData?.name} ({coinData?.symbol.toUpperCase()}) Balance:
          </Text>
          <Stack spacing="12px" align={"center"} direction={"row"} mb="12px">
            <Image src={coinData?.image.small} />
            <Text fontSize={"28px"} fontWeight={"bold"}>
              {formatCurrency(assetBalance)}
            </Text>
            <PriceChange
              percentage={
                coinData?.market_data.price_change_percentage_24h ?? -7
              }
            />
          </Stack>
          <Stack spacing="16px" direction="row" align="center">
            <Stack direction="column" spacing="6px">
              <Text fontSize="14px" color="gray">
                Quantity
              </Text>
              <Text fontSize="14px" color="#000" fontWeight={"bold"}>
                {assetQuantity.toFixed(2)} {coinData?.symbol.toUpperCase()}
              </Text>
            </Stack>
            <Stack direction="column" spacing="6px">
              <Text fontSize="14px" color="gray">
                Avg. buy price
              </Text>
              <Text fontSize="14px" color="#000" fontWeight={"bold"}>
                {formatCurrency(totalBuyPrice / transactions.length)}
              </Text>
            </Stack>
          </Stack>
          <AssetsHistoryTable
            columns={columns}
            rows={transactions}
            symbol={coinData?.symbol ?? "BTC"}
          />
        </Stack>
      </Container>
    </>
  );
};
export default AssetHistory;
