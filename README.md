# Commitspark Example: Next.js Website

[Commitspark](https://commitspark.com) is a set of tools to manage structured data with Git through a GraphQL API.

This example demonstrates how to use the [Commitspark GraphQL API](https://github.com/commitspark/graphql-api) as a CMS
API for a website built with Next.js. It enables website content to be queried directly from a Git repository on GitHub
as if querying a content management system.

## Getting started

1. Ensure you have created
   a [copy of the example content repository](https://github.com/commitspark/example-content-website/generate)
2. Ensure you have created
   a [copy of this application repository](https://github.com/commitspark/example-nextjs/generate)
3. Check out the application repository copy on your local machine
4. Obtain a GitHub access token (see
   the [Commitspark GitHub adapter documentation](https://github.com/commitspark/git-adapter-github#personal-access-token)
   for
   details)
5. Copy `.env.dist` to `.env`
6. Edit `.env` and enter the location of your copied content repository as well as your access token
7. Install dependencies with `npm i`
8. Launch the application with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see an example website driven by Commitspark
from your Git content repository.

To see content from a branch other than `main` in Next.js, change the `PUBLISHED_BRANCH` variable in `.env`.

## Editing content

Use the [Commitspark data editing frontend](https://github.com/commitspark/frontend) to obtain a CMS-like user
interface that enables users to create, read, update, and delete Commitspark-managed data directly in a repository, even
with limited technical knowledge.
