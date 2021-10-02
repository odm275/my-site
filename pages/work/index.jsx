import Head from "next/head";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import ProjectCard from "../../components/ProjectCard";
import { getAllPosts } from "../../lib/api";

const WorkTitle = styled("h1")`
  margin-bottom: 1em;
`;
export default function Work({ allProjects }) {
  const projectCards = allProjects.map((project, i) => {
    const { title, slug, description, coverImage } = project;
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
      <Head>
        <title>Oscar Mejia</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Layout>
        <WorkTitle>Work</WorkTitle>
        <>{projectCards || null}</>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allProjects = getAllPosts(
    ["title", "date", "slug", "description", "author", "coverImage", "excerpt"],
    "_projects"
  );

  return {
    props: { allProjects },
  };
}
