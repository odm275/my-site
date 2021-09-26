import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export function getPostSlugs(path) {
  return fs.readdirSync(path);
}

export function getPostBySlug(slug, fields = [], path) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(path, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      if (field === "categories") {
        const formatted = data[field].replace(" ", "").trim().split(";");
        items[field] = formatted;
      } else {
        items[field] = data[field];
      }
    }
  });

  return items;
}

export function getAllPosts(fields = [], path) {
  const pathToDirectory = join(process.cwd(), path);
  const slugs = getPostSlugs(pathToDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, path))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
