import { memo } from "react";
import { Button, FormControl, InputGroup } from "@chakra-ui/react";

interface ModalTriggerProps {
  registrationOnOpen: () => void;
}

// Modal trigger triggers the registration modal
const ModalTrigger = ({ registrationOnOpen }: ModalTriggerProps) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          w={"full"}
          size={"lg"}
          border={"2px"}
          fontWeight={"bold"}
          variant={"outline"}
          borderRadius={"full"}
          colorScheme={"purple"}
          onClick={registrationOnOpen}
        >
          Create an account
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default memo(ModalTrigger);
