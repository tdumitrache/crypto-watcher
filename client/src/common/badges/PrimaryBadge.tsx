import { Badge } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface PrimaryBadgeProps {
  content: ReactNode | string;
  [rest: string]: any;
}

const PrimaryBadge: FC<PrimaryBadgeProps> = ({ content, ...rest }) => {
  return (
    <Badge fontSize='12px' p='2px 6px' borderRadius={'4px'} {...rest}>
      {content}
    </Badge>
  );
};

export default PrimaryBadge;
