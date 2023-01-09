import { FC, useContext, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { loginUser } from 'api/users';
import LoadingSpinner from 'common/loading-spinner';
import { AuthContext } from 'context/AuthContext';
import { useMutation } from 'react-query';

interface LoginModalProps {
  isLoginModalOpen: boolean;
  onCloseLoginModal: () => void;
}

const LoginModal: FC<LoginModalProps> = ({
  isLoginModalOpen,
  onCloseLoginModal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);

  const toast = useToast();

  const { mutate: mutateLoginUser, isLoading: isLoadingLoginUser } =
    useMutation('loginUser', () => loginUser(email, password), {
      onSuccess: (data) => {
        const { token } = data;

        setToken(token);
        resetCredentials();
        onCloseLoginModal();

        toast({
          title: 'Welcome!',
          description: 'You succesfully logged in.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Oops.',
          description: 'Invalid credentials.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      },
    });

  const resetCredentials = () => {
    setEmail('');
    setPassword('');
  };

  const handleLoginClick = () => {
    mutateLoginUser();
  };

  return (
    <>
      <Modal isOpen={isLoginModalOpen} onClose={onCloseLoginModal}>
        <ModalOverlay />
        {isLoadingLoginUser ? (
          <LoadingSpinner size={150} />
        ) : (
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize='24px'
              fontWeight={'bold'}
            >
              Log In
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction='column'>
                <FormControl>
                  <FormLabel fontSize={'14px'} fontWeight='bold'>
                    Email address
                  </FormLabel>
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Please enter email...'
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='14px' fontWeight={'bold'}>
                    Password
                  </FormLabel>
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Please enter password...'
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                width={'100%'}
                mr={3}
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
