import { Image, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ICryptoNew } from '../types';

const CryptoNew: FC<ICryptoNew> = ({ title, url, imgurl }) => {
  return (
    <ChakraLink href={url} target='_blank'>
      <Stack direction='column'>
        <Image
          src={imgurl}
          w='280px'
          h='135px'
          borderRadius='8px'
          objectFit={'cover'}
          bgPosition='center'
        />
        <Text
          fontSize={'14px'}
          fontWeight='600'
          color='gray.700'
          noOfLines={1}
          title={title}
        >
          {title}
        </Text>
      </Stack>
    </ChakraLink>
  );
};

export default CryptoNew;
