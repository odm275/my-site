import styled from "@emotion/styled";
import Link from "next/link";
import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 830px;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    margin-bottom: 1em;

    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) {
        color: ${(props) => props.theme.colors.blue500};
      }
      &:nth-of-type(2) {
        color: ${(props) => props.theme.colors.orange500};
      }
      &:nth-of-type(3) {
        color: ${(props) => props.theme.colors.purple500};
      }
      &:nth-of-type(4) {
        color: ${(props) => props.theme.colors.green500};
      }
      &:nth-of-type(5) {
        color: ${(props) => props.theme.colors.teal500};
      }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) {
          color: ${(props) => props.theme.colors.blue600};
          background-color: ${(props) => props.theme.colors.blue200};
        }
        &:nth-of-type(2) {
          color: ${(props) => props.theme.colors.orange600};
          background-color: ${(props) => props.theme.colors.orange200};
        }
        &:nth-of-type(3) {
          color: ${(props) => props.theme.colors.purple600};
          background-color: ${(props) => props.theme.colors.purple200};
        }
        &:nth-of-type(4) {
          color: ${(props) => props.theme.colors.green600};
          background-color: ${(props) => props.theme.colors.green200};
        }
        &:nth-of-type(5) {
          color: ${(props) => props.theme.colors.teal600};
          background-color: ${(props) => props.theme.colors.teal200};
        }
      }
    }
  }
`;

const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`;

export default function Index({ allPosts }) {
  console.log("allPosts", allPosts);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  // const projectCards = projects.map((project, i) => {
  //   const { title, slug, kinds } = project.node
  //   const {
  //     previewThumbnail,
  //     description,
  //     previewDescription,
  //   } = project.node.ACFProjectFields

  //   return (
  //     <ProjectCard
  //       key={i}
  //       category={kinds}
  //       title={title}
  //       description={previewDescription}
  //       thumbnail={previewThumbnail}
  //       uid={slug}
  //     />
  //   )
  // })
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
