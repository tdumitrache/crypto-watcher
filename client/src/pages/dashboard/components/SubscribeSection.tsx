import { Box, Stack, Text } from '@chakra-ui/react';
import subscribeSectionSvg from 'assets/svg/subscribe-section.svg';
import { PrimaryButton } from 'common/buttons';

const SubscribeSection = () => {
  return (
    <Box bg='rgb(247, 247, 247)'>
      <Stack
        direction='row'
        justify={'space-between'}
        mt='24px'
        p='16px'
        maxW='1400px'
        mx='auto'
      >
        <Stack direction='column' alignSelf='center' spacing='12px'>
          <Text fontSize='32px'>
            Be the first to know about{' '}
            <Text as='span' fontWeight={'bold'} color='gray.700'>
              crypto news every day
            </Text>
          </Text>
          <Text fontSize='16px' mb='24px !important' fontWeight={'500'}>
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don't miss a single newsletter.
          </Text>
          <PrimaryButton
            label='Subscribe now'
            fontSize='14px'
            maxW='120px'
            onClick={() => {}}
            height='48px'
          />
        </Stack>
        <Box
          backgroundImage={subscribeSectionSvg}
          bgPosition='center'
          backgroundSize={'cover'}
          objectFit={'cover'}
          w='570px'
          h='300px'
        />
      </Stack>
    </Box>
  );
};

export default SubscribeSection;
