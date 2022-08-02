import {
  Badge,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillCaretDown } from 'react-icons/ai';

const EthGasMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={Text}
        cursor={'pointer'}
        colorScheme='blue'
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Stack direction='row' align='center' spacing='4px'>
          <Text fontSize='xs' color='blue.600' fontWeight={'700'}>
            7 Gwei
          </Text>
          <Icon as={AiFillCaretDown} w='6px' h='6px' color='blue.600' />
        </Stack>
      </MenuButton>
      <MenuList minWidth='240px' p='12px'>
        <Stack direction='column'>
          <Stack direction='row' spacing='10px'>
            <Stack direction='column' spacing='4px'>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                Slow
              </Text>
              <Text fontSize='14px' color='gray.700' fontWeight={'700'}>
                11 Gwei
              </Text>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                ~615 seconds
              </Text>
            </Stack>
            <Stack direction='column' spacing='4px'>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                Standard
              </Text>
              <Text fontSize='14px' color='gray.700' fontWeight={'700'}>
                12 Gwei
              </Text>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                ~195 seconds
              </Text>
            </Stack>
            <Stack direction='column' spacing='4px'>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                Fast
              </Text>
              <Text fontSize='14px' color='gray.700' fontWeight={'700'}>
                14 Gwei
              </Text>
              <Text fontSize='10px' color='gray.500' fontWeight={'500'}>
                ~45 seconds
              </Text>
            </Stack>
          </Stack>
          <Badge p='6px' fontSize='10px' borderRadius={'12px'}>
            Powered by Etherscan
          </Badge>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default EthGasMenu;
