import { Badge } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface SecondaryBadgeProps {
  content: ReactNode | string;
  [rest: string]: any;
}

const SecondaryBadge: FC<SecondaryBadgeProps> = ({ content, ...rest }) => {
  return (
    <Badge
      fontSize='12px'
      p='2px 6px'
      borderRadius={'4px'}
      bg='#808a9d'
      color='#fff'
      {...rest}
    >
      {content}
    </Badge>
  );
};

export default SecondaryBadge;
