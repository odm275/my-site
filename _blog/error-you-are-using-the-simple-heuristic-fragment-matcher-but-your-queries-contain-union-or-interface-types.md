---
title: "Error: You Are Using The Simple Heuristic Fragment Matcher But Your Queries Contain Union Or Interface Types"
excerpt: Solve the error:"You are using the simple (heuristic) fragment matcher"
date: "2020-03-16T05:35:07.322Z"
ogImage:
  url: "/assets/blog/error-you-are-using-the-simple-heuristic-fragment-matcher-but-your-queries-contain-union-or-interface-types/error_screenshot.png"
author:
  name: Oscar Mejia
  picture: "/assets/blog/authors/jj.jpeg"
keywords: "Oscar Mejia,React,GraphQL"
---

I ran into this error when consuming my GraphQL API in my front-end.

![Error Screenshot](/assets/blog/error-you-are-using-the-simple-heuristic-fragment-matcher-but-your-queries-contain-union-or-interface-types/error_screenshot.png)

Turns out all this error means is that we need a bit of extra set up so Apollo client can handle union and interfaces defined in our API. This set up is documented in [Apollo’s documentation](https://www.apollographql.com/docs/react/data/fragments/#generating-possibletypes-automatically). However, this example uses apollo-boost and our set up is more robust. Thus, we'll match the difference.

## Step 1: Script to auto generate schema

Copy paste this file into the root(anywhere is fine) of your project

```js
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
```

## Step 2: Set up a script to run SchemaQuery.js and run it

`“build-fragment”: “node src/schemaQuery.js”`

Run the script

`npm run build-fragment`

That should generate the fragmentTypes.json file.

## Step 3: Integrate to ApolloClient

Next we will need to import the fragmentTypes.json file where ApolloClient is declared. The result will look something like the following

```js
import introspectionQueryResultData from "./fragmentTypes.json";
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});
const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
  uri: "/api",
  cache,
});
```
