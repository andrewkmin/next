import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Text,
  ModalBody,
} from "@chakra-ui/react";
import RegistrationForm from "../forms/RegistrationForm";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent rounded={"2xl"} m={2}>
          <ModalHeader>
            <Text fontWeight={"semibold"}>Register for Polygon</Text>
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody py={5}>
            <RegistrationForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegistrationModal;
