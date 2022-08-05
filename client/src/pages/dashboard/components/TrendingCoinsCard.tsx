import { Badge, Flex, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { ITrendyCoin } from 'api/coins/types';
import LoadingSpinner from 'common/loading-spinner';
import { FC, Fragment } from 'react';
import { FcLike } from "react-icons/fc";

interface TrendingCoinsCardProps {
  trendiestCoins: ITrendyCoin[];
  isFetchingTrendiestCoins: boolean;
}

const TrendingCoinsCard: FC<TrendingCoinsCardProps> = ({ trendiestCoins, isFetchingTrendiestCoins }) => {


  if (isFetchingTrendiestCoins) {
    return <LoadingSpinner size={150} />
  }

  return (
    <Flex flexDirection="column" boxShadow={"rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px"} borderRadius="8px" p="16px" w="448px" h="200px" bg="#fff" my="12px">
      <Flex justify="space-between" w="100%" mb="24px">
        <Stack direction="row" spacing="6px" me="auto" alignContent={"center"}>
          <Icon as={FcLike} alignSelf="center" />
          <Text fontSize="16px" fontWeight={"bold"} color="gray.700">Trending</Text>
        </Stack>
        <Badge colorScheme={"green"} fontSize="10px" borderRadius="8px" w="fit-conent" h="fit-content">Rank</Badge>
      </Flex>
      <Flex flexDirection={"column"}>
        {
          trendiestCoins?.map((coin) => {
            return (<Fragment key={coin.item.id}>
              <Flex justify="space-between" align="center" mb="24px">
                <Stack me="auto" spacing="6px" align="center" direction={"row"}>
                  <Text fontSize="12px" color="#808a9d" me="4px" fontWeight="bold">{coin.item.score + 1}</Text>
                  <Image src={coin.item.thumb} alt="logo" title="logo" w="16px" h="16px" />
                  <Text fontWeight={"bold"} fontSize="12px">{coin.item.name}</Text>
                  <Text fontSize="12px" color="#808a9d">{coin.item.symbol}</Text>
                </Stack>
                <Text fontSize={"12px"} fontWeight="bold">{`#${coin.item.market_cap_rank}`}</Text>
              </Flex>

            </Fragment>)
          })
        }
      </Flex>

    </Flex>
  )
}

export default TrendingCoinsCard