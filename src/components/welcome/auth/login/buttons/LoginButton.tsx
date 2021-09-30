import { Button, FormControl, InputGroup } from "@chakra-ui/react";

interface LoginButtonProps {
  isSubmitting: boolean;
}

const LoginButton = ({ isSubmitting }: LoginButtonProps) => {
  return (
    <FormControl>
      <InputGroup>
        <Button
          w={"full"}
          size={"lg"}
          type={"submit"}
          rounded={"full"}
          fontWeight={"bold"}
          fontStyle={"normal"}
          bgColor={"purple.400"}
          colorScheme={"purple"}
          isLoading={isSubmitting}
          loadingText={"Logging in"}
        >
          Log in
        </Button>
      </InputGroup>
    </FormControl>
  );
};

export default LoginButton;
