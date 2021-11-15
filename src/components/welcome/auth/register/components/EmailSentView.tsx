import { useEffect, useState } from "react";
import axios from "../../../../../helpers/axios";
import { Inputs as RegistrationInputs } from "../forms/RegistrationForm";
import { Box, Button, Center, Stack, Text, useToast } from "@chakra-ui/react";

interface EmailSentViewProps {
  payload: RegistrationInputs;
}

const EmailSentView = ({ payload }: EmailSentViewProps) => {
  const [cooldown, setCooldown] = useState(0);
  const toast = useToast({ isClosable: false });

  const handleSendAgain = async () => {
    const response = await axios.post("/auth/register", payload);

    // Checking response status
    toast({
      status: response.status === 204 ? "success" : "error",
      title:
        response.status === 204
          ? "Email was sent!"
          : response.status === 403
          ? "Already authenticated"
          : "There was an error",
      description:
        response.status !== 204 && response.status !== 403
          ? `Status: ${response.status}`
          : null,
    });

    if (response.status === 204) {
      return setCooldown(60);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setCooldown(cooldown - 1), 1000);
    if (cooldown === 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <Box>
      <Box p={2}>
        <Stack>
          <Center>
            <Text fontWeight={"bold"} fontSize={["xl", "2xl"]}>
              Thanks for registering
            </Text>
          </Center>

          <Center>
            <Text textAlign={"center"} fontSize={"md"}>
              Please open your email and verify your account
            </Text>
          </Center>

          <Center>
            <Button
              w={"full"}
              textDecor={"none"}
              bgColor={"purple.400"}
              colorScheme={"purple"}
              disabled={cooldown !== 0}
              onClick={() => (cooldown !== 0 ? null : handleSendAgain())}
            >
              {cooldown !== 0 ? `${cooldown}s` : "Haven't received the email?"}
            </Button>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
};

export default EmailSentView;
