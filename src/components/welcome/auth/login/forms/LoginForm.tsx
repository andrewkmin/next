import {
  Stack,
  useToast,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import LoginButton from "../buttons/LoginButton";
import axios from "../../../../../helpers/axios";
import { AuthContext } from "../../../../../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

// Login form component
const LoginForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const toast = useToast({ position: "bottom-left" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For handling the login
  const handleLogin = async (payload: Inputs) => {
    // Enable loader
    setIsSubmitting(true);
    // Sending the request
    const authResponse = await axios.post("/api/auth/login", payload);
    // Disable loader
    setIsSubmitting(false);

    // Checking response status
    if (authResponse.status !== 204) {
      const { status, data } = authResponse;

      // If there are invalid fields
      if (status === 400) {
        const errorResponse = data as {
          errors: [{ param: string; msg: string }];
        };
        errorResponse?.errors?.forEach((error) =>
          setError(error.param as any, { message: error.msg })
        );
      }
      // If the credentials are invalid
      else if (status === 403) {
        setError("password", { message: "Incorrect password" });
      }
      // If user doesn't exist
      else if (status === 404) {
        setError("email", { message: "That account doesn't exist" });
      }
      // If it's another error
      else {
        return toast({
          status: "error",
          isClosable: false,
          title: "There was an error",
        });
      }
    } else {
      // Fetching user data
      const { data: user } = await axios.get("/api/accounts/me");
      // Setting the state
      setUser!!({ ...user });
      return router.push("/");
    }
  };

  return (
    <Box>
      <form autoComplete={"off"} onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={5}>
          <Stack>
            {/* Email input */}
            <FormControl isInvalid={errors?.email && true}>
              <FormLabel>Email</FormLabel>
              <Input
                size={"lg"}
                type={"email"}
                placeholder={"Email"}
                {...register("email", {
                  required: true,
                  pattern: new RegExp(""),
                })}
              />
              <FormErrorMessage>
                {errors?.email?.message || "Invalid email"}
              </FormErrorMessage>
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={errors?.password && true}>
              <FormLabel>Password</FormLabel>
              <Input
                size={"lg"}
                type={"password"}
                placeholder={"Password"}
                {...register("password", { minLength: 8, required: true })}
              />
              <FormErrorMessage>
                {errors?.password?.message ||
                  "Should be at least 8 characters long"}
              </FormErrorMessage>
            </FormControl>
          </Stack>

          {/* Submit */}
          <LoginButton isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
