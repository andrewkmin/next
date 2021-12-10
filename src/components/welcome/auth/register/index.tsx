import { memo } from "react";
import { useDisclosure } from "@chakra-ui/react";
import ModalTriggerButton from "./buttons/ModalTrigger";
import RegistrationModal from "./modals/RegistrationModal";

const Register = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <ModalTriggerButton registrationOnOpen={onOpen} />
      <RegistrationModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default memo(Register);
