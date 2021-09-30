import { Global } from "@emotion/react";

export default () => (
  <Global
    styles={`
    ::selection {
        background: rgba(159, 122, 234, 0.7);
    }
    `}
  />
);
