const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  const blogPage = "5565490016eb475888bfe3830154700e";
  const response = await notion.blocks.children.list({
    block_id: blogPage,
    page_size: 50,
  });
  console.log(response);

  res.status(200).json({ name: "Hello World!" });
};
