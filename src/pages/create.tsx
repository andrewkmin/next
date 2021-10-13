import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";
import PlatformLayout from "../layouts/PlatformLayout";

const Create: NextPage = () => {
  return <Box></Box>;
};

(Create as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Create;
