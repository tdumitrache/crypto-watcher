import { Badge } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ErrorBadgeProps {
  content: ReactNode | string;
  [rest: string]: any;
}

const ErrorBadge: FC<ErrorBadgeProps> = ({ content, ...rest }) => {
  return (
    <Badge
      fontSize='12px'
      p='2px 6px'
      bg='#ea3943'
      borderRadius={'4px'}
      {...rest}
    >
      {content}
    </Badge>
  );
};

export default ErrorBadge;
