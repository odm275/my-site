---
title: "Dynamic Routing and Static Generation"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: JJ Kasper
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

I ran into this error when consuming my GraphQL API in my front-end.

![Tux, the Linux mascot](/assets/projects/error-you-are-using-the-simple-heuristic-fragment-matcher-but-your-queries-contain-union-or-interface-types/error_screenshot.png)

Turns out all this error means is that we need a bit of extra set up so Apollo client can handle union and interfaces defined in our API. This set up is documented in [Apollo’s documentation](https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically). However, this example uses apollo-boost and our set up is more robust. Thus, we'll match the difference.

## Step 1: Script to auto generate schema

Copy paste this file into the root(anywhere is fine) of your project

~~~js
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const REACT_APP_GRAPHQL_URI = "http://localhost:9000/api";
fetch(REACT_APP_GRAPHQL_URI, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    variables: {},
    query: `{
__schema {
types {
kind
name
possibleTypes {
name
}
}
}
}`,
  }),
})
  .then((result) => result.json())
  .then((result) => {
    result.data.__schema.types = result.data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    );
    fs.writeFileSync(
      path.resolve(__dirname, "./src/fragmentTypes.json"),
      JSON.stringify(result.data),
      (err) => {
        if (err) {
          console.error("Error writing fragmentTypes file", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      }
    );
  });
~~~

## Step 2: Set up a script to run SchemaQuery.js and run it

`“build-fragment”: “node src/schemaQuery.js”`

Run the script

`npm run build-fragment`

That should generate the fragmentTypes.json file.

## Step 3: Integrate to ApolloClient

Next we will need to import the fragmentTypes.json file where ApolloClient is declared. The result will look something like the following

~~~js
import introspectionQueryResultData from "./fragmentTypes.json";
const fragmentMatcher = new IntrospectionFragmentMatcher({
introspectionQueryResultData,
});
const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
uri: "/api",
cache
});
~~~
