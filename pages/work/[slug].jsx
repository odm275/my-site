import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import ErrorPage from "next/error";
import styled from "@emotion/styled";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import { FiGithub } from "react-icons/fi";

import Button from "../../components/ui/Button";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";

const ProjectHeroContainer = styled("div")`
  background: ${(props) => props.theme.colors.grey300};
  padding-top: 40px;
  display: flex;
  justify-content: center;
`;

const ProjectTitle = styled("h2")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 2rem;
`;

const SkillsSectionTitle = styled("h3")`
  text-align: center;
`;

const ProjectBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  img {
    width: 100%;
  }
  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;
  }
`;

const WorkLink = styled("a")`
  margin-top: 3em;
  display: block;
  text-align: center;
`;

const SkillsWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;
const Skill = styled("div")`
  flex: 0 0 33%;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
`;

const SocialMediaContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default function Project({ project }) {
  console.log("project", project);
  const router = useRouter();
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const skills = project.categories.map((kind) => {
    return <Skill>{kind}</Skill>;
  });

  const HeadElement = (
    <Head>
      <title>{project.title}</title>
      <meta property="description" content={project.description} />
      <meta property="og:title" content={project.title} />
      <meta property="og:description" content={project.description} />
      <meta property="og:image" content={project.ogImage.url} />
      <meta name="keywords" content={project.categories.join(",")} />
      <link rel="icon" href="/favicon/favicon.ico" />
    </Head>
  );
  return (
    <>
      {HeadElement}
      <Layout>
        {router.isFallback ? (
          <ProjectTitle>Loading…</ProjectTitle>
        ) : (
          <>
            <ProjectTitle>{project.title}</ProjectTitle>
            <SocialMediaContainer>
              <a href={project.repo} target="_blank">
                <FiGithub />
              </a>
              <a
                css={{
                  paddingLeft: "20px",
                  textDecoration: "none",
                }}
                href={project.liveLink}
                target="_blank"
              >
                Live Link
              </a>
            </SocialMediaContainer>
            {project.coverImage && (
              <ProjectHeroContainer>
                <Image
                  src={project.coverImage}
                  layout="intrinsic"
                  height={273}
                  width={600}
                />
              </ProjectHeroContainer>
            )}
            <ProjectBody>
              <ReactMarkdown>{project.content}</ReactMarkdown>
              <SkillsSectionTitle>Skills + Technology</SkillsSectionTitle>
              <SkillsWrapper>{skills}</SkillsWrapper>
              <WorkLink to={"/work"}>
                <Button className="Button--secondary">See other work</Button>
              </WorkLink>
            </ProjectBody>
          </>
        )}
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const project = getPostBySlug(
    params.slug,
    [
      "title",
      "description",
      "coverImage",
      "date",
      "author",
      "content",
      "ogImage",
      "slug",
      "categories",
      "repo",
      "liveLink",
    ],
    "_projects"
  );
  // const content = await markdownToHtml(post.content || "");
  return {
    props: {
      project,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "_projects");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
