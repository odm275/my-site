import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Footer from "./Footer";
import Header from "./Header";

const LayoutContainer = styled.div`
  max-width: ${(props) => props.theme.dimensions.maxwidthDesktop}px;
  padding-left: ${(props) => props.theme.dimensions.paddingHorizontalDesktop}em;
  padding-right: ${(props) =>
    props.theme.dimensions.paddingHorizontalDesktop}em;
  margin: 0 auto;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    padding-left: ${(props) =>
      props.theme.dimensions.paddingHorizontalTablet}em;
    padding-right: ${(props) =>
      props.theme.dimensions.paddingHorizontalTablet}em;
  }

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
    padding-left: ${(props) =>
      props.theme.dimensions.paddingHorizontalMobile}em;
    padding-right: ${(props) =>
      props.theme.dimensions.paddingHorizontalMobile}em;
  }

  .Layout__content {
    padding-bottom: 5em;
  }
`;

const Layout = ({ children }) => (
  <LayoutContainer className="div">
    <div className="Layout">
      <Header />
      <main className="Layout__content">{children}</main>
      <Footer />
    </div>
  </LayoutContainer>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
