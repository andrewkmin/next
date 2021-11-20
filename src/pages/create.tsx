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
import {
  CREATE_POST_META_TITLE,
  OPEN_GRAPH_GLOBAL_TYPE,
  CREATE_POST_META_DESCRIPTION,
} from "../constants";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import PlatformLayout from "../layouts/PlatformLayout";

// Form body
type CreateForm = {
  body: string;
};

const Create: NextPage = () => {
  // prettier-ignore
  const { register, formState: { dirtyFields } } = useForm<CreateForm>();

  return (
    <>
      <NextSeo
        title={CREATE_POST_META_TITLE}
        description={CREATE_POST_META_DESCRIPTION}
        openGraph={{
          type: OPEN_GRAPH_GLOBAL_TYPE,
          title: CREATE_POST_META_TITLE,
          description: CREATE_POST_META_DESCRIPTION,
        }}
      />

      <Box>
        <Container mt={4} maxW={"container.md"}>
          <Stack spacing={8}>
            <Heading>Create a post</Heading>

            <form onSubmit={() => {}}>
              <Stack spacing={4}>
                <Box>
                  <Textarea
                    rows={3}
                    size={"lg"}
                    rounded={"xl"}
                    resize={"none"}
                    {...register("body", {
                      required: true,
                    })}
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
