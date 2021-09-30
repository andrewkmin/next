import LoginModal from "./modals/LoginModal";
import { useDisclosure } from "@chakra-ui/react";
import ModalTriggerButton from "./buttons/ModalTriggerButton";

const Login = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <ModalTriggerButton loginModalOnOpen={onOpen} />
      <LoginModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Login;
