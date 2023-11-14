import React from 'react'
import Link from 'next/link'

export interface HeaderMenuEntry {
  label: {
    en: string
    de: string
  }
  linkTo: {
    slug: {
      en: string
      de: string
    }
  }
}

interface NavigationProps {
  lang: string
  headerMenuEntries: HeaderMenuEntry[]
}

const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
  const otherLang = props.lang === 'en' ? 'de' : 'en'
  return (
    <header>
      <nav className="mx-auto flex max-w-xl items-center justify-between p-6 lg:px-8">
        <div className={'space-x-6'}>
          {props.headerMenuEntries.map((headerMenuEntryData, index) => (
            <Link
              href={`/${props.lang}/${
                headerMenuEntryData.linkTo.slug[props.lang]
              }`}
              className="text-sm font-semibold leading-6 text-gray-900"
              key={index}
            >
              {headerMenuEntryData.label[props.lang]}
            </Link>
          ))}
        </div>
        <div className={'flex-grow'} />
        <Link
          href={`/${otherLang}`}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {otherLang.toUpperCase()}
        </Link>
      </nav>
    </header>
  )
}

export default Navigation
