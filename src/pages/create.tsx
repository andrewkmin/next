import {
  Box,
  Container,
  Textarea,
  Heading,
  Stack,
  Button,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import PlatformLayout from "../layouts/PlatformLayout";

type CreateForm = {
  body: string;
};

const Create: NextPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<CreateForm>();

  const watchBody = watch("body");
  const createPost = async (payload: CreateForm) => {};

  return (
    <>
      <Head>
        <title>Create post — Polygon</title>
      </Head>

      <Box>
        <Container mt={4} maxW={"container.md"}>
          <Stack spacing={8}>
            <Heading>Create a post</Heading>

            <form onSubmit={handleSubmit(createPost)}>
              <Stack spacing={4}>
                <Box>
                  <Textarea
                    rows={10}
                    size={"lg"}
                    rounded={"xl"}
                    resize={"none"}
                    {...register("body", {
                      required: true,
                    })}
                    placeholder={"Post anything you want :)"}
                  />
                </Box>

                <Box>
                  <Flex alignItems={"center"}>
                    <Spacer />
                    <Button
                      size={"lg"}
                      type={"submit"}
                      colorScheme={"purple"}
                      bgColor={"purple.400"}
                      isDisabled={dirtyFields.body && true}
                    >
                      Post
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

(Create as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Create;
