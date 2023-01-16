import { FC, useState } from 'react';

import {
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { getCoinsByQuery } from 'api/coins';
import { BsArrowRightShort } from 'react-icons/bs';
import { useQuery } from 'react-query';
import AddTransaction from './AddTransaction';

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  market_cap_rank: number;
}

interface IisVisibleState {
  modalContent1: boolean;
  modalContent2: boolean;
}

interface BuyModalProps {
  isOpenBuyModal: boolean;
  onCloseBuyModal: () => void;
}

const BuyCryptoModal: FC<BuyModalProps> = ({
  isOpenBuyModal,
  onCloseBuyModal,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [cryptoId, setCryptoId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<IisVisibleState>({
    modalContent1: true,
    modalContent2: false,
  });

  useQuery(`getCoinsByQuery/${inputValue}`, () => getCoinsByQuery(inputValue), {
    onSuccess: (data) => {
      setCoins(
        data.coins
          .filter((_: ICoin, idx: number) => idx <= 100)
          .sort(
            (coin1: ICoin, coin2: ICoin) =>
              coin1.market_cap_rank - coin2.market_cap_rank
          )
      );
    },
  });

  return (
    <>
      <Modal isOpen={isOpenBuyModal} onClose={onCloseBuyModal}>
        <ModalOverlay />
        <ModalContent pb='12px'>
          <ModalHeader fontSize='24px' fontWeight={'bold'} mx='6px'>
            {isVisible.modalContent1 ? 'Select Coin' : 'Add Transaction'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px='22px'>
            <Flex
              direction='column'
              display={isVisible.modalContent1 ? 'flex' : 'none'}
            >
              <Input
                placeholder='Search...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                mb='16px'
              />
              <Flex
                direction='column'
                gap='16px'
                maxHeight={'400px'}
                overflowY='scroll'
              >
                {coins.map((coin: ICoin) => {
                  return (
                    <Flex
                      key={coin.id}
                      justify='space-between'
                      align={'center'}
                      p='10px'
                      cursor={'pointer'}
                      borderRadius={'12px'}
                      _hover={{ backgroundColor: '#f4f4f4' }}
                      onClick={() => {
                        setCryptoId(coin.id);
                        setIsVisible({
                          modalContent1: false,
                          modalContent2: true,
                        });
                      }}
                    >
                      <Flex align='center' gap='6px'>
                        <Image src={coin.thumb} w='24px' h='24px' />
                        <Text fontSize='14px' fontWeight={'bold'}>
                          {coin.name}
                        </Text>
                        <Text
                          fontSize='14px'
                          fontWeight={'bold'}
                          color='rgb(128, 138, 157)'
                        >
                          {coin.symbol}
                        </Text>
                      </Flex>
                      <Icon
                        as={BsArrowRightShort}
                        color='gray'
                        width='24px'
                        height='24px'
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
            <Flex
              direction='column'
              display={isVisible.modalContent2 ? 'flex' : 'none'}
            >
              <AddTransaction
                cryptoId={cryptoId}
                setIsVisible={setIsVisible}
                onCloseBuyModal={onCloseBuyModal}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyCryptoModal;
