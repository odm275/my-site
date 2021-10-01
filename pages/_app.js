import { css, Global } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/index";
import { globalStyles } from "../styles/global";
import { typeStyles } from "../styles/typography";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global styles={css([globalStyles, typeStyles])} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
