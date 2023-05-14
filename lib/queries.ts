import {
  createAdapter,
  GitHubRepositoryOptions,
} from '@commitspark/git-adapter-github'
import { getApiService } from '@commitspark/graphql-api'
import { GitAdapter } from '@commitspark/git-adapter'

export async function getSlugs(): Promise<string[]> {
  const gitHubAdapter = await getGitAdapter()
  const apiService = await getApiService()

  let response
  try {
    response = await apiService.postGraphQL(
      gitHubAdapter,
      process.env.PUBLISHED_BRANCH ?? 'main',
      {
        query: `query {
          data: allPages {
            slug
          }
        }`,
      },
    )
  } catch (error) {}

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

export async function getPageDataBySlug(
  slug: string,
): Promise<Record<string, any>> {
  const gitHubAdapter = await getGitAdapter()
  const apiService = await getApiService()

  let response
  try {
    response = await apiService.postGraphQL(
      gitHubAdapter,
      process.env.PUBLISHED_BRANCH ?? 'main',
      {
        query: `query {
          data: allPages {
            title
            contentElements {
              __typename
              ... on Hero {
                heading
                image {
                  absoluteUrl
                  width
                  height
                  altText
                }
                imagePosition
              }
              ... on SectionTitle {
                heading
                body
              }
              ... on Body {
                body
              }
            }
            slug
            seo {
              metaTags {
                name
                value
              }
            }
          }
        }`,
      },
    )
  } catch (error) {}

  if (!response) {
    throw new Error(`Failed to retrieve data for page "${slug}"`)
  }

  if (response.errors) {
    throw new Error(response.errors.join('; '))
  }
  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error('Failed to retrieve content')
  }

  // Commitspark currently does not support complex queries; since we build statically, this inefficiency should be
  // bearable at build-time
  for (const pageData of response.data.data) {
    if (pageData['slug'] === slug) {
      return pageData
    }
  }

  throw new Error()
}

export async function getHeader(): Promise<Record<string, any>> {
  const gitHubAdapter = await getGitAdapter()
  const apiService = await getApiService()

  let response
  try {
    response = await apiService.postGraphQL(
      gitHubAdapter,
      process.env.PUBLISHED_BRANCH ?? 'main',
      {
        query: `query {
          data: allHeaders {
            headerMenuEntries {
              label
              linkTo {
                slug
              }
            }
          }
        }`,
      },
    )
  } catch (error) {}

  if (!response) {
    throw new Error(`Failed to retrieve data for header`)
  }

  if (response.errors) {
    throw new Error(response.errors.join('; '))
  }
  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error('Failed to retrieve header content')
  }

  // we assume there is only one Header
  return response.data.data[0]
}

async function getGitAdapter(): Promise<GitAdapter> {
  const gitHubAdapter = createAdapter()
  await gitHubAdapter.setRepositoryOptions({
    repositoryOwner: process.env.GITHUB_REPOSITORY_OWNER,
    repositoryName: process.env.GITHUB_REPOSITORY_NAME,
    personalAccessToken: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  } as GitHubRepositoryOptions)

  return gitHubAdapter
}
