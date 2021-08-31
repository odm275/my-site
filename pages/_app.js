import { Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/index";
import { globalStyles } from "../styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
