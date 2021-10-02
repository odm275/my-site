import Head from "next/head";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import ProjectCard from "../../components/ProjectCard";
import { getAllPosts } from "../../lib/api";
import { workPageMeta } from "../meta-data";

const WorkTitle = styled("h1")`
  margin-bottom: 1em;
`;

const HeadElement = (
  <Head>
    <title>{workPageMeta.title.value}</title>
    <meta
      property={workPageMeta.description.property}
      content={workPageMeta.description.content}
    />
    <meta
      property={workPageMeta.ogTitle.property}
      content={workPageMeta.ogTitle.content}
    />
    <meta
      property={workPageMeta.ogDescription.property}
      content={workPageMeta.ogDescription.content}
    />
    <meta
      property={workPageMeta.ogImage.property}
      content={workPageMeta.ogImage.content}
    />
    <meta
      name={workPageMeta.keywords.name}
      content={workPageMeta.keywords.content}
    />
    <link rel="icon" href="/favicon/favicon.ico" />
  </Head>
);
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
      {HeadElement}
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
