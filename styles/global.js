import { css } from "@emotion/react";

export const globalStyles = css`
  @font-face {
    font-family: Inter;
    src: url("https://rsms.me/inter/inter.css");
  }
  html {
    font-family: "Inter", sans-serif;
  }

  @supports (font-variation-settings: normal) {
    html {
      font-family: "Inter var", sans-serif;
    }
  }

  html,
  body,
  #__next {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
  }

  body {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.5;
    color: ${(props) => props.theme.colors.grey900};
    -webkit-font-smoothing: antialiased;

    @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
      font-size: 14px;
    }

    * {
      box-sizing: border-box;

      &::selection {
        background: ${(props) => props.theme.colors.orange500};
        color: white;
      }
    }
  }
`;
