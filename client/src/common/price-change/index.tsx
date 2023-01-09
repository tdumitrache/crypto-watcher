import React, { FC } from 'react';
import { Icon, Text, Stack } from '@chakra-ui/react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

interface PriceChangeProps {
  percentage: number;
}

const PriceChange: FC<PriceChangeProps> = ({ percentage }) => {
  return (
    <Stack align='center' direction='row' spacing='4px'>
      {percentage < 0 ? (
        <>
          <Icon as={AiFillCaretDown} w='12px' h='12px' color={'#ea3943'} />
          <Text fontWeight={'bold'} color={'#ea3943'} fontSize='12px'>
            {`${percentage.toFixed(2)}%`}
          </Text>
        </>
      ) : (
        <>
          <Icon as={AiFillCaretUp} w='12px' h='12px' color={'#16c784'} />
          <Text fontWeight={'bold'} color={'#16c784'} fontSize='12px'>
            {`${percentage.toFixed(2)}%`}
          </Text>
        </>
      )}
    </Stack>
  );
};

export default PriceChange;
