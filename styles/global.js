import { css } from "@emotion/react";

export const globalStyles = css`
  @font-face {
    font-family: Inter;
  }

  html,
  body,
  #root {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    font-family: Inter;
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
