import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const FooterContainer = styled("div")`
  padding-top: 3.75em;
  padding-bottom: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    max-width: 50px;
  }
`;

const FooterAuthor = styled("a")`
  font-size: 0.75em;
  color: ${(props) => props.theme.colors.grey700};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;

  &:hover {
    color: ${(props) => props.theme.colors.blue900};

    .FooterRocket {
      animation-name: rotate;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ImageWrapper = styled("div")`
  margin-top: 0.25em;
`;

const Footer = () => (
  <FooterContainer>
    <FooterAuthor href="https://whatoscarhasmade.com">
      © {new Date().getFullYear()} — Oscar Mejia
      <ImageWrapper>
        <Image
          className="FooterRocket"
          src="/assets/other/rocket.png"
          width={33}
          height={33}
        />
      </ImageWrapper>
    </FooterAuthor>
  </FooterContainer>
);

export default Footer;
