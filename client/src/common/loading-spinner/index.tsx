import ClipLoader from "react-spinners/ClipLoader";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";

interface LoadingSpinnerProps {
  size: number;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size }) => {
  return (
    <Flex align="center" justify={"center"}>
      <ClipLoader size={size} color="#c9c7c7" />
    </Flex>
  )
}

export default LoadingSpinner