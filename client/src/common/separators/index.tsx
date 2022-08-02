import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

interface SeparatorProps {
  variant: 'horizontal' | 'vertical';
  [rest: string]: string;
}

const Separator: FC<SeparatorProps> = ({ variant, ...rest }) => {
  return (
    <Flex
      h={variant === 'horizontal' ? '1px' : '22.5px'}
      w={variant === 'horizontal' ? '100%' : '1px'}
      bg={
        variant === 'horizontal'
          ? 'linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0) 100%)'
          : 'linear-gradient(0deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)'
      }
      {...rest}
    ></Flex>
  );
};

export default Separator;
