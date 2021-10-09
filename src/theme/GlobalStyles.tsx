import { Global } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={`
      ::selection {
          background: rgba(159, 122, 234, 0.7);
      }
      `}
  />
);

export default GlobalStyles;
