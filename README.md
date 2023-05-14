# Commitspark Example: Next.js Website

This example demonstrates how a Next.js Website can be filled with content served by
[Commitspark](https://commitspark.com), the workflow-first Content Management System based on Git and GraphQL.

## Getting started

1. Ensure you have created
   a [copy of the example content repository](https://github.com/commitspark/example-content-website/generate)
2. Ensure you have created
   a [copy of this application repository](https://github.com/commitspark/example-nextjs/generate)
3. Check out the application repository copy on your local machine
4. Obtain a [GitHub Personal Access Token (classic)](https://github.com/settings/tokens) with `repo` scope
5. Copy `.env.dist` to `.env`
6. Edit `.env` and enter the location of your copied content repository as well as your personal access token
7. Install dependencies with `npm i`
8. Launch the application with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see an example website driven by Commitspark
from your Git content repository.

## Editing content

To edit content, sign in with GitHub at [Commitspark](https://commitspark.com/en-us/sign-in/), browse to your copy
of the content repository and start editing.

To see content from a branch other than `main` in Next.js, change the `PUBLISHED_BRANCH` variable in `.env`.
