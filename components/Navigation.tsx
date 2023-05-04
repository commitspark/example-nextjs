import React from 'react'

interface HeaderMenuEntry {
  label: string
  linkTo: {
    slug: string
  }
}

interface NavigationProps {
  headerMenuEntries: HeaderMenuEntry[]
}

const Navigation: React.FC<NavigationProps> = (props: NavigationProps) => {
  return (
    <header>
      <nav className="mx-auto flex max-w-xl items-center justify-between p-6 lg:px-8">
        {props.headerMenuEntries.map((headerMenuEntryData, index) => (
          <a
            href={headerMenuEntryData.linkTo.slug}
            className="text-sm font-semibold leading-6 text-gray-900"
            key={index}
          >
            {headerMenuEntryData.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navigation
