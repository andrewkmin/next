import {
  Stack,
  useToast,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import create from "zustand";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LoginButton from "../buttons/LoginButton";
import { useUser } from "../../../../../stores/useUser";
import axios, { setAxiosBearerToken } from "../../../../../helpers/axios";
import { useTokenStore } from "../../../../../stores/useTokenStore";

const useSubmitting = create<Submitting>((set) => ({
  submitting: false,
  toggle: () => set(({ submitting }) => ({ submitting: !submitting })),
}));

// Declaring as a type since we don't need to extend it somewhere
type Inputs = {
  email: string;
  password: string;
};

// Declaring as a type since we don't need to extend it somewhere
type Submitting = {
  submitting: boolean;
  toggle: () => void;
};

// Login form component
const LoginForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const toast = useToast();
  const router = useRouter();

  // Stores
  const setUser = useUser(({ setUser }) => setUser);
  const setTokens = useTokenStore(({ setTokens }) => setTokens);
  // prettier-ignore
  const [isSubmitting, toggleSubmitting] = useSubmitting(({ submitting, toggle }) => [submitting, toggle]);

  // For handling the login
  const handleLogin = async (payload: Inputs) => {
    toggleSubmitting();

    // prettier-ignore
    const { status: authStatus, data: authData } = await axios.post("/auth/login", payload);
    toggleSubmitting();

    if (authStatus !== 200) {
      // If there are invalid fields
      if (authStatus === 400) {
        const errorResponse = authData as {
          errors: [{ param: string; msg: string }];
        };

        return errorResponse?.errors?.forEach((error) =>
          setError(error.param as any, { message: error.msg })
        );
      } else if (authStatus === 403) {
        // If the credentials are invalid
        return setError("password", { message: "Incorrect password" });
      } else if (authStatus === 404) {
        // If user doesn't exist
        return setError("email", { message: "That account doesn't exist" });
      } else {
        return toast({
          status: "error",
          isClosable: false,
          title: "There was an error",
        });
      }
    } else {
      // Updating the bearer token
      setAxiosBearerToken(authData.token);
      setTokens({ accessToken: authData.token, refreshToken: "" });

      // Fetching and setting current user
      const { data: user } = await axios.get("/api/users/me");
      setUser(user);

      // Redirect to the main page
      return await router.push("/");
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
                  pattern:
                    // RFC email RegEx pattern
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
