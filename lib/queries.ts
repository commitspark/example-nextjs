import { createAdapter } from '@commitspark/git-adapter-github'
import { Client, createClient, GraphQLResponse } from '@commitspark/graphql-api'
import { HeaderMenuEntry } from '@/components/Navigation'

export async function getSlugs(): Promise<{ en: string; de: string }[]> {
  let response: GraphQLResponse<Record<string, unknown>>
  try {
    response = await (
      await getCommitsparkClient()
    ).postGraphQL(process.env.PUBLISHED_BRANCH ?? 'main', {
      query: `query {
          data: everyPage {
            slug {
              en
              de
            }
          }
        }`,
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  if (!response) {
    throw new Error(
      'Failed to retrieve slugs; did you create and configure your ".env" file?',
    )
  }

  if (response.errors) {
    throw new Error(response.errors.map((error) => error.message).join('; '))
  }
  if (!Array.isArray(response.data.data)) {
    throw new Error('Failed to retrieve page content')
  }

  return response.data.data.map((pageData: any) => pageData.slug)
}

export async function getPageDataByLangSlug(
  lang: string,
  slug: string,
): Promise<Record<string, any>> {
  let response: GraphQLResponse<Record<string, unknown>>
  try {
    response = await (
      await getCommitsparkClient()
    ).postGraphQL(process.env.PUBLISHED_BRANCH ?? 'main', {
      query: `query {
          data: everyPage {
            title {
              en
              de
            }
            contentElements {
              __typename
              ... on Hero {
                heading {
                  en
                  de
                }
                image {
                  imageId
                  width
                  height
                  altText {
                    en
                    de
                  }
                }
                imagePosition
              }
              ... on Text {
                body {
                  en
                  de
                }
              }
            }
            slug {
              en
              de
            }
            seo {
              metaTags {
                name
                value
              }
            }
          }
        }`,
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  if (!response) {
    throw new Error(`Failed to retrieve data for page "${slug}"`)
  }

  if (response.errors) {
    throw new Error(
      response.errors
        .map((error: Record<string, any>) => JSON.stringify(error))
        .join('; '),
    )
  }
  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error('Failed to retrieve content')
  }

  // Commitspark currently does not support complex queries; since we build statically, this inefficiency should be
  // bearable at build-time
  for (const pageData of response.data.data) {
    if (pageData['slug'][lang] === slug) {
      return pageData
    }
  }

  throw new Error()
}

export async function getHeader(): Promise<{
  headerMenuEntries: HeaderMenuEntry[]
}> {
  let response: GraphQLResponse<Record<string, unknown>>
  try {
    response = await (
      await getCommitsparkClient()
    ).postGraphQL(process.env.PUBLISHED_BRANCH ?? 'main', {
      query: `query {
          data: everyHeader {
            headerMenuEntries {
              label {
                en
                de
              }
              linkTo { # The Commitspark GraphQL library transparently resolves references to @Entry entries
                slug {
                  en
                  de
                }
              }
            }
          }
        }`,
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  if (!response) {
    throw new Error(`Failed to retrieve data for header`)
  }

  if (response.errors) {
    throw new Error(response.errors.map((error) => error.message).join('; '))
  }
  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error('Failed to retrieve header content')
  }

  // we assume there is only one Header
  return response.data.data[0]
}

let clientInstance: Client | null = null

async function getCommitsparkClient(): Promise<Client> {
  if (!clientInstance) {
    const gitHubAdapter = createAdapter({
      repositoryOwner: process.env.GITHUB_REPOSITORY_OWNER,
      repositoryName: process.env.GITHUB_REPOSITORY_NAME,
      accessToken: process.env.GITHUB_ACCESS_TOKEN,
    })
    clientInstance = await createClient(gitHubAdapter)
  }

  return clientInstance
}
