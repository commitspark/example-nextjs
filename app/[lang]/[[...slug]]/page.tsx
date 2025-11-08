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
  params: Promise<PageParams>
  searchParams: any
}) {
  const { slug, lang } = await params
  const joinedSlug = slug ? slug.join('/') : ''
  const pageData = await getPageDataByLangSlug(lang, joinedSlug)
  const headerData = await getHeader()

  let contentElements: ReactElement[] = []
  pageData.contentElements.map((contentElementData: any, index: number) => {
    const componentProps = { ...contentElementData }
    delete componentProps['__typename']

    switch (contentElementData['__typename']) {
      case 'Hero':
        contentElements.push(
          <Hero {...componentProps} lang={lang} key={index} />,
        )
        break
      case 'Text':
        contentElements.push(
          <Text {...componentProps} lang={lang} key={index} />,
        )
        break
    }
  })

  return (
    <>
      <div className="pb-16">
        <Navigation
          lang={lang}
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
  params: Promise<PageParams>
  searchParams: any
}): Promise<Metadata> {
  const { slug, lang } = await params
  const joinedSlug = slug ? slug.join('/') : ''
  const props = await getPageDataByLangSlug(lang, joinedSlug)

  const metaTags: Metadata = {}
  for (const metaTag of props.seo?.metaTags ?? []) {
    metaTags[metaTag['name']] = metaTag['value']
  }
  metaTags['title'] = props.title[lang]

  return metaTags
}
