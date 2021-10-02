import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Layout from "../../components/layout";
import PostCard from "../../components/PostCard";
import { getAllPosts } from "../../lib/api";

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

export default function Blog({ allPosts }) {
  console.log("allPosts", allPosts);
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
      <Head>
        <title>Oscar Mejia</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
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
