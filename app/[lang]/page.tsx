import React from 'react'
import { getHeader } from '@/lib/queries'
import Navigation from '@/components/Navigation'

export async function generateStaticParams(): Promise<any> {
  return [
    {
      lang: 'en',
    },
    { lang: 'de' },
  ]
}

export default async function Page({ params }) {
  const headerData = await getHeader()
  if (headerData.headerMenuEntries === undefined) {
    throw new Error()
  }

  return (
    <div className="pb-16">
      <Navigation
        lang={params.lang}
        headerMenuEntries={headerData.headerMenuEntries}
      />
    </div>
  )
}
