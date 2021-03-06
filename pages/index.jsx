import Head from "next/head";
import styled from "@emotion/styled";
import Link from "next/link";
import Layout from "../components/layout";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";
import About from "../components/About";
import { getAllPosts } from "../lib/api";
import { frontPageMeta } from "../meta-data";
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

const WorkAction = styled("a")`
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

const HeadElement = (
  <Head>
    <title>{frontPageMeta.title.value}</title>
    <meta
      property={frontPageMeta.description.property}
      content={frontPageMeta.description.content}
    />
    <meta
      property={frontPageMeta.ogTitle.property}
      content={frontPageMeta.ogTitle.content}
    />
    <meta
      property={frontPageMeta.ogDescription.property}
      content={frontPageMeta.ogDescription.content}
    />
    <meta
      property={frontPageMeta.ogImage.property}
      content={frontPageMeta.ogImage.content}
    />
    <meta
      name={frontPageMeta.keywords.name}
      content={frontPageMeta.keywords.content}
    />
    <link rel="icon" href="/favicon/favicon.ico" />
  </Head>
);

export default function Index({ allProjects = [], myInfo = [] }) {
  const heroPost = allProjects[0];
  const morePosts = allProjects.slice(1);
  const projectCards = allProjects.map((project, i) => {
    const { title, description, coverImage, slug } = project;
    return (
      <ProjectCard
        key={i}
        title={title}
        // category={kinds}
        description={description}
        coverImage={coverImage}
        slug={slug}
      />
    );
  });

  return (
    <>
      {HeadElement}
      <Layout>
        <Hero>
          <div>
            <h1 data-pm-context="[]">
              Hola! My name is <a href="/">Oscar Mejia</a>. Here you can find a
              showcase of my <a href="/work">work</a> and my{" "}
              <a href="/blog" data-span="hyperlink">
                thoughts
              </a>
              ! Here???s my full{" "}
              <a
                href="https://drive.google.com/file/d/1IIZI5jXqvhFj5Tmfd5RYApWd0cer4MD4/view"
                target="_blank"
                rel="noopener"
              >
                CV
              </a>
              .
            </h1>
          </div>

          <a
            href={`mailto:oscarmejiaweb@gmail.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Email Me</Button>
          </a>
        </Hero>
        <Section>
          {projectCards}
          <Link href="/work">
            <WorkAction>
              See more work <span>&#8594;</span>
            </WorkAction>
          </Link>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Section>
        <Section>
          <div>About</div>
          <About myInfo={myInfo} />
        </Section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allProjects = getAllPosts(
    ["title", "date", "slug", "description", "author", "coverImage", "excerpt"],
    "_projects"
  );
  // Note: There will only always be one myInfo markdown file.
  const myInfo = getAllPosts(
    ["email", "github", "linkedin", "CV", "bio"],
    "_myInfo"
  )[0];
  console.log("myInfo", myInfo);

  return {
    props: { allProjects, myInfo },
  };
}
