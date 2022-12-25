import { Badge } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface SuccessBadgeProps {
  content: ReactNode | string;
  [rest: string]: any;
}

const SuccessBadge: FC<SuccessBadgeProps> = ({ content, ...rest }) => {
  return (
    <Badge
      fontSize='12px'
      p='2px 6px'
      bg={'#16c784'}
      borderRadius={'4px'}
      {...rest}
    >
      {content}
    </Badge>
  );
};

export default SuccessBadge;
