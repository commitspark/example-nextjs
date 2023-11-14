import React, { ReactElement } from 'react'
import { getHeader, getPageDataByLangSlug, getSlugs } from '@/lib/queries'
import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Text from '@/components/Text'
import Navigation from '@/components/Navigation'

export interface PageParams {
  lang: string
  slug?: string[]
}

export const dynamicParams = false

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getSlugs()

  const params: PageParams[] = []
  for (const slug of slugs) {
    for (const lang of ['en', 'de']) {
      params.push({
        lang: lang,
        slug: slug[lang].split('/'),
      })
    }
  }
  return params
}

export default async function Page({
  params,
}: {
  params: PageParams
  searchParams: any
}) {
  const slug = params.slug ? params.slug.join('/') : ''
  const pageData = await getPageDataByLangSlug(params.lang, slug)
  const headerData = await getHeader()

  let contentElements: ReactElement[] = []
  pageData.contentElements.map((contentElementData: any, index: number) => {
    const componentProps = { ...contentElementData }
    delete componentProps['__typename']

    switch (contentElementData['__typename']) {
      case 'Hero':
        contentElements.push(
          <Hero {...componentProps} lang={params.lang} key={index} />,
        )
        break
      case 'Text':
        contentElements.push(
          <Text {...componentProps} lang={params.lang} key={index} />,
        )
        break
    }
  })

  return (
    <>
      <div className="pb-16">
        <Navigation
          lang={params.lang}
          headerMenuEntries={headerData.headerMenuEntries}
        />
      </div>
      <div className="space-y-8">{contentElements}</div>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
  searchParams: any
}): Promise<Metadata> {
  const slug = params.slug ? params.slug.join('/') : ''
  const props = await getPageDataByLangSlug(params.lang, slug)

  const metaTags: Metadata = {}
  for (const metaTag of props.seo?.metaTags ?? []) {
    metaTags[metaTag['name']] = metaTag['value']
  }

  return metaTags
}
