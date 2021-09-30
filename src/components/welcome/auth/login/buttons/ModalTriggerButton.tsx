import { Button, FormControl, InputGroup } from "@chakra-ui/react";

interface ModalTriggerProps {
  loginModalOnOpen: () => void;
}

// Modal trigger triggers the registration modal
const ModalTrigger = ({ loginModalOnOpen }: ModalTriggerProps) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          w={"full"}
          size={"lg"}
          fontWeight={"bold"}
          fontStyle={"normal"}
          borderRadius={"full"}
          colorScheme={"purple"}
          bgColor={"purple.400"}
          onClick={loginModalOnOpen}
        >
          Log in
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default ModalTrigger;
