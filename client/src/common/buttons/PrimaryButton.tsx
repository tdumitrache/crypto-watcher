import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  [rest: string]: any;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ label, onClick, ...rest }) => {
  return (
    <Button
      variant='solid'
      colorScheme={'blue'}
      size='sm'
      fontSize='10px'
      fontWeight={'bold'}
      {...rest}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
