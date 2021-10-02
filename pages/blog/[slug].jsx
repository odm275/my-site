import React, { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import PropTypes from "prop-types";
import Moment from "react-moment";
import styled from "@emotion/styled";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import CodeBlock from "../../components/CodeBlock";
import { getPostBySlug, getAllPosts } from "../../lib/api";

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`;

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  p {
    text-align: right;
    color: ${(props) => props.theme.colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`;

const PostCategory = styled("div")`
  margin-right: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey600};
`;

const PostTitle = styled("h1")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`;

const PostBody = styled("div")`
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`;

const PostMetas = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${(props) => props.theme.colors.grey600};
`;

const PostAuthor = styled("div")`
  margin: 0;
`;

const PostDate = styled("div")`
  margin: 0;
`;

const PostCategoryContainer = styled("div")`
  display: flex;

  .category-container__category {
  }
`;

export default function Post({ post }) {
  console.log(post);
  const HeadElement = (
    <Head>
      <title>{post.title}</title>
      <meta property="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.ogImage.url} />
      <meta name="keywords" content={post.keywords} />
      <link rel="icon" href="/favicon/favicon.ico" />
    </Head>
  );
  return (
    <>
      {HeadElement}
      <Layout>
        <PostCategoryContainer className="category-container"></PostCategoryContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostMetas>
          <PostAuthor>{post.author.name}</PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.date}</Moment>
          </PostDate>
        </PostMetas>
        <PostBody>
          <ReactMarkdown components={CodeBlock}>{post.content}</ReactMarkdown>
        </PostBody>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "excerpt", "date", "author", "content", "ogImage", "keywords"],
    "_blog"
  );
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "_blog");

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
