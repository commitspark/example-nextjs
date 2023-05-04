import React, { ReactElement } from 'react'
import { getHeader, getPageDataBySlug, getSlugs } from '@/lib/queries'
import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionTitle from '@/components/SectionTitle'
import Body from '@/components/Body'
import Navigation from '@/components/Navigation'

export interface PageParams {
  slug?: string[]
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getSlugs()

  // we assume slugs use `/` separators with no leading and trailing `/`, therefore the index page is an empty string
  return slugs.map((slug: string) => {
    if (slug === '') {
      return {}
    }
    return {
      slug: slug.split('/'),
    } as PageParams
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: any
}) {
  const slug = params.slug ? params.slug.join('/') : ''
  const pageData = await getPageDataBySlug(slug)
  const headerData = await getHeader()

  let contentElements: ReactElement[] = []
  pageData.contentElements.map((contentElementData: any, index: number) => {
    const componentProps = { ...contentElementData }
    delete componentProps['__typename']

    switch (contentElementData['__typename']) {
      case 'Hero':
        contentElements.push(<Hero {...componentProps} key={index} />)
        break
      case 'SectionTitle':
        contentElements.push(<SectionTitle {...componentProps} key={index} />)
        break
      case 'Body':
        contentElements.push(<Body {...componentProps} key={index} />)
        break
    }
  })

  return (
    <div className="pb-16">
      <Navigation {...headerData} />
      <div className="space-y-8">{contentElements}</div>
    </div>
  )
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: any
}): Promise<Metadata> {
  const slug = params.slug ? params.slug.join('/') : ''
  const props = await getPageDataBySlug(slug)

  const metaTags: Metadata = {}
  for (const metaTag of props.seo?.metaTags) {
    metaTags[metaTag['name']] = metaTag['value']
  }

  return metaTags
}
