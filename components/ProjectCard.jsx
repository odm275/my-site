import React from "react";
import Link from "next/link";
import Img from "next/image";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
// import parse from "html-react-parser";

const ProjectCardContainer = styled("a")`
  display: grid;
  grid-template-columns: 4fr 7fr;
  box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
  margin-bottom: 4em;
  transition: all 150ms ease-in-out;
  text-decoration: none;
  color: currentColor;

  @media (max-width: 950px) {
    grid-template-columns: 4.5fr 7fr;
  }

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
    margin-bottom: 2em;
  }

  &:hover {
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
    transition: all 150ms ease-in-out;

    .ProjectCardAction {
      color: ${(props) => props.theme.colors.blue500};
      transition: all 150ms ease-in-out;

      span {
        transform: translateX(0px);
        opacity: 1;
        transition: transform 150ms ease-in-out;
      }
    }

    .ProjectCardContent::before {
      opacity: 0.02;
      transition: all 150ms ease-in-out;
    }

    .ProjectCardImageContainer::before {
      opacity: 0.2;
      transition: all 150ms ease-in-out;
    }
  }
`;

const ProjectCardContent = styled("div")`
  background: white;
  padding: 4em 3em 2.25em 3em;
  position: relative;

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${(props) => props.theme.colors.blue500};
    mix-blend-mode: multiply;
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  @media (max-width: 950px) {
    padding: 3.25em 2.5em 2em 2.5em;
  }

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    grid-row: 2;
  }
`;

const ProjectCardCategory = styled("h6")`
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey600};
`;

const ProjectCardTitle = styled("h3")`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;

const ProjectCardBlurb = styled("div")`
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 5em;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    margin-bottom: 2.5em;
  }
`;

const ProjectCardAction = styled("div")`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }
`;

const ProjectCardImageContainer = styled("div")`
  background: ${(props) => props.theme.colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-left: 2em;
  padding-right: 2em;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    padding-top: 3em;
    max-height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  &:before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${(props) => props.theme.colors.blue500};
    mix-blend-mode: multiply;
    opacity: 0;
    transition: all 150ms ease-in-out;
  }

  .gatsby-image-wrapper {
    max-width: 400px;
    width: 100%;
    height: 85%;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);

    @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
      max-width: 300px;
      height: 100%;
    }
  }
`;

const ProjectCard = ({ category, title, description, coverImage, slug }) => (
  <Link href={`work/${slug}`}>
    <ProjectCardContainer>
      <ProjectCardContent className="ProjectCardContent">
        {/* <ProjectCardCategory>
                {category}
            </ProjectCardCategory> */}
        <ProjectCardTitle>{title}</ProjectCardTitle>
        <ProjectCardBlurb>{description}</ProjectCardBlurb>
        <ProjectCardAction className="ProjectCardAction">
          Details <span>&#8594;</span>
        </ProjectCardAction>
      </ProjectCardContent>
      <ProjectCardImageContainer className="ProjectCardImageContainer">
        <Img src={coverImage} layout="fill" />
      </ProjectCardImageContainer>
    </ProjectCardContainer>
  </Link>
);

export default ProjectCard;

ProjectCard.propTypes = {
  category: PropTypes.array.isRequired,
  thumbnail: PropTypes.object.isRequired,
  title: PropTypes.array.isRequired,
  description: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
};
