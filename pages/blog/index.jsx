import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/api";
import { blogPageMeta } from "../meta-data";

const BlogTitle = styled("h1")`
  margin-bottom: 1em;
`;

const BlogGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5em;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5em;
  }

  @media (max-width: ${(props) => props.theme.dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 2.5em;
  }
`;

const HeadElement = (
  <Head>
    <title>{blogPageMeta.title.value}</title>
    <meta
      property={blogPageMeta.description.property}
      content={blogPageMeta.description.content}
    />
    <meta
      property={blogPageMeta.ogTitle.property}
      content={blogPageMeta.ogTitle.content}
    />
    <meta
      property={blogPageMeta.ogDescription.property}
      content={blogPageMeta.ogDescription.content}
    />
    <meta
      property={blogPageMeta.ogImage.property}
      content={blogPageMeta.ogImage.content}
    />
    <meta
      name={blogPageMeta.keywords.name}
      content={blogPageMeta.keywords.content}
    />
    <link rel="icon" href="/favicon/favicon.ico" />
  </Head>
);

export default function Blog({ allPosts }) {
  const postCards = allPosts.map((post, i) => {
    return (
      <PostCard
        key={i}
        author={post.author}
        // category={post.kinds}
        title={post.title}
        date={post.date}
        excerpt={post.excerpt}
        slug={post.slug}
      />
    );
  });
  return (
    <>
      {HeadElement}
      <Layout>
        <BlogTitle>Blog</BlogTitle>
        <BlogGrid>{postCards}</BlogGrid>
      </Layout>
    </>
  );
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
};

export async function getStaticProps() {
  const allPosts = getAllPosts(
    [
      "title",
      "excerpt",
      "coverImage",
      "date",
      "author",
      "coverImage",
      "excerpt",
      "coverImage",
      "ogImage",
      "slug",
    ],
    "_blog"
  );
  return {
    props: { allPosts },
  };
}
