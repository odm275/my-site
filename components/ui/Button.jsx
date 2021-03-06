import React, { Component } from "react";
import styled from "@emotion/styled";

const ButtonContainer = styled("button")`
  padding: 1em 2em;
  background: ${(props) => props.theme.colors.blue400};
  font-weight: 600;
  color: white;
  outline: none;
  border: none;
  font-size: 1rem;
  border-radius: 2px;
  position: relative;
  transition: background 100ms ease-in-out;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
    padding: 0.8em 1.8em;
    font-size: 1em;
  }

  p {
    margin: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      ${(props) => props.theme.colors.pink400} 0%,
      ${(props) => props.theme.colors.purple400} 100%
    );
    z-index: -1;
  }

  &:hover {
    cursor: pointer;
    background: transparent;
    transition: background 100ms ease-in-out;
  }

  &.Button--secondary {
    background: ${(props) => props.theme.colors.blue200};
    color: ${(props) => props.theme.colors.blue600};
    padding: 0.95em 1.8em;
    font-size: 0.95rem;

    &:hover {
      background: ${(props) => props.theme.colors.blue300};
      transition: background 100ms ease-in-out;
    }
  }
`;

const Button = (props) => {
  return (
    <ButtonContainer onClick={props.onClick} {...props}>
      {props.children}
    </ButtonContainer>
  );
};

export default Button;
