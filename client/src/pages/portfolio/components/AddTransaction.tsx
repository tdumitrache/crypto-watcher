import { FC, useEffect, useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";

import { getCoinData } from "api/coins";
import { addNewTransaction } from "api/users";
import LoadingSpinner from "common/loading-spinner";
import { useMutation, useQuery } from "react-query";
import { formatCurrency } from "utilities";

interface AddTransactionProps {
  cryptoId: string;
  setIsVisible: ({
    modalContent1,
    modalContent2,
  }: {
    modalContent1: boolean;
    modalContent2: boolean;
  }) => void;
  onCloseBuyModal: () => void;
}

const AddTransaction: FC<AddTransactionProps> = ({
  cryptoId,
  setIsVisible,
  onCloseBuyModal,
}) => {
  const [amount, setAmount] = useState<string>("0");
  const [value, setValue] = useState<string>("0");

  const toast = useToast();

  const { data: cryptoData, isFetching: isFetchingCryptoData } = useQuery(
    `getCoinData/${cryptoId}`,
    () => getCoinData(cryptoId)
  );

  const {
    mutate: mutateNewTransaction,
    isLoading: isLoadingAddNewTransaction,
  } = useMutation(
    "addNewTransaction",
    () =>
      addNewTransaction(
        cryptoId,
        Number(value) ?? 0,
        Number(value) * Number(amount)
      ),
    {
      onSuccess: () => {
        toast({
          title: "Transaction is done!",
          description: "You succesfully executed a new transaction.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        onCloseBuyModal();
      },
      onError: (error) => {
        toast({
          title: "Oops! Something went wrong",
          description: String(error),
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

  useEffect(() => {
    setValue(String(cryptoData?.market_data?.current_price?.usd ?? 0));

    return () => {
      setIsVisible({
        modalContent1: true,
        modalContent2: false,
      });
    };
  }, [cryptoData, setIsVisible]);

  function handleAddNewTransaction() {
    mutateNewTransaction();
  }

  if (isFetchingCryptoData || isLoadingAddNewTransaction) {
    return <LoadingSpinner size={100} />;
  }

  return (
    <Flex direction="column" gap="20px">
      <Flex align="center" gap="6px">
        <Image src={cryptoData?.image?.small} w="24px" h="24px" />
        <Text fontSize="14px" fontWeight={"bold"}>
          {cryptoData?.name}
        </Text>
        <Text fontSize="14px" fontWeight={"bold"} color="rgb(128, 138, 157)">
          {cryptoData?.symbol?.toUpperCase()}
        </Text>
      </Flex>
      <Flex align="center" gap="6px">
        <FormControl>
          <FormLabel fontSize="14px" fontWeight="bold">
            Quantity
          </FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            step={1}
            color="#000"
            value={amount}
            onChange={(e) => setAmount(e)}
            fontWeight={500}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="14px" fontWeight="bold">
            Price Per Coin
          </FormLabel>
          <NumberInput
            value={formatCurrency(Number(value))}
            min={0}
            color="#000"
            fontWeight={500}
            onChange={(e) => setValue(e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>
      <Flex
        direction={"column"}
        gap="8px"
        borderRadius={"8px"}
        padding="24px"
        background="rgb(239, 242, 245)"
      >
        <Text fontSize="14px" color="rgb(88, 102, 126)">
          Total Spent
        </Text>
        <Text fontSize="24px" color="#000" fontWeight={"bold"}>
          {formatCurrency(Number(amount) * Number(value))}
        </Text>
      </Flex>
      <Button colorScheme="blue" onClick={handleAddNewTransaction}>
        Add Transaction
      </Button>
    </Flex>
  );
};

export default AddTransaction;
