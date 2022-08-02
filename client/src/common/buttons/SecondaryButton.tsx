import { FC } from 'react';
import { Button } from '@chakra-ui/react';

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      variant='outline'
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

export default SecondaryButton;
