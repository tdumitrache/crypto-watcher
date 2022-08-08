import { FC, ReactElement } from 'react';
import { Button, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons"

interface TransparentIconButtonProps {
  icon: IconType;
  label: string;
  [rest: string]: any;
}

const TransparentIconButon: FC<TransparentIconButtonProps> = ({ icon, label, ...rest }) => {
  return (
    <Button leftIcon={<Icon as={icon} w="18px" h="18px" color="gray.400" />} variant='outline' border="none" fontSize="12px" px="8px" {...rest} >
      {label}
    </Button>
  )
}

export default TransparentIconButon