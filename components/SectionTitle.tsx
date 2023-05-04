import React from 'react'

interface SectionTitleProps {
  heading: string
  body: string
}

const SectionTitle: React.FC<SectionTitleProps> = (
  props: SectionTitleProps,
) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {props.heading}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">{props.body}</p>
        </div>
      </div>
    </>
  )
}

export default SectionTitle
