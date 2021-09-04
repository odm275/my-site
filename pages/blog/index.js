import { getDatabase } from "../../lib/notion";
export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Test({ posts }) {
  console.log("posts", posts);
  return (
    <div>
      <h1>hello Blog Page</h1>
    </div>
  );
}

export async function getStaticProps() {
  const database = await getDatabase(databaseId);
  return {
    props: {
      posts: database,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
