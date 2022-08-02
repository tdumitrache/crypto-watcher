import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      variant='solid'
      colorScheme={'blue'}
      size='sm'
      fontSize='10px'
      fontWeight={'bold'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
