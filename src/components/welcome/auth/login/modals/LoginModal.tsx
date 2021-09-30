import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalBody,
  Flex,
} from "@chakra-ui/react";
import LoginForm from "../forms/LoginForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded={"2xl"} m={2}>
          <ModalHeader>
            <Flex>
              <Text fontWeight={"semibold"}>Log in to Polygon</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={5}>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
