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
import { registerUser } from 'api/users';
import { useMutation } from 'react-query';
import LoadingSpinner from 'common/loading-spinner';
import { AuthContext } from 'context/AuthContext';

interface SignInModalProps {
  isSignInModalOpen: boolean;
  onCloseSignInModal: () => void;
}

const SignInModal: FC<SignInModalProps> = ({
  isSignInModalOpen,
  onCloseSignInModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);

  const toast = useToast();

  const { mutate: mutateRegisterUser, isLoading: isLoadingRegisterUser } =
    useMutation('registerUser', () => registerUser(name, email, password), {
      onSuccess: (data) => {
        const { token } = data;

        setToken(token);
        resetCredentials();
        onCloseSignInModal();

        toast({
          title: 'Account created!',
          description: 'You succesfully created an account.',
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
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleRegisterClick = () => {
    mutateRegisterUser();
  };

  return (
    <>
      <Modal isOpen={isSignInModalOpen} onClose={onCloseSignInModal}>
        <ModalOverlay />
        {isLoadingRegisterUser ? (
          <LoadingSpinner size={150} />
        ) : (
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize='24px'
              fontWeight={'bold'}
            >
              Sign In
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction='column'>
                <FormControl>
                  <FormLabel fontSize={'14px'} fontWeight='bold'>
                    Name
                  </FormLabel>
                  <Input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Please enter name...'
                  />
                </FormControl>
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
                onClick={handleRegisterClick}
              >
                Sign In
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default SignInModal;
