import {
  chakra,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Confetti from "react-confetti";

const Greeting = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
    return () => onClose();
  }, [onOpen, onClose]);

  return (
    <>
      <Confetti
        style={{
          zIndex: 99999,
        }}
        recycle={false}
        numberOfPieces={1000}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <Modal isCentered onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent mx={2} pb={3.5}>
          <ModalHeader>
            <Text>
              Greetings from{" "}
              <chakra.span color={"purple.400"}>Polygon</chakra.span> team 👋
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody userSelect={"none"}>
            <Stack spacing={3}>
              <Text>
                Hi and welcome to{" "}
                <chakra.span fontWeight={"thin"} color={"purple.500"}>
                  Polygon
                </chakra.span>
                , the first social network aimed to be the most private!
              </Text>

              <Text>
                We{`'`}re honored to have a user like{" "}
                <chakra.span fontWeight={"thin"} color={"purple.500"}>
                  you
                </chakra.span>{" "}
                and we hope that your experience on our platform will be
                fantastic.
              </Text>

              <Divider borderColor={"purple.200"} border={"1.5px"} />

              <Text fontWeight={"bold"} fontSize={"sm"}>
                CEO and Founder, Michael Grigoryan
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Greeting;
