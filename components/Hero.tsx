import React from 'react'
import Image from 'next/image'

interface ImageReference {
  absoluteUrl: string
  width: number
  height: number
  altText: string
}

enum ImagePosition {
  aboveHeading = 'aboveHeading',
  belowHeading = 'belowHeading',
}

interface HeroProps {
  heading: string
  image?: ImageReference
  imagePosition?: ImagePosition
}

const Hero: React.FC<HeroProps> = (props: HeroProps) => {
  let image = <></>
  if (props.image) {
    image = (
      <Image
        className={'rounded-xl'}
        src={props.image.absoluteUrl}
        alt={props.image.altText}
        width={props.image.width}
        height={props.image.height}
        quality={95}
      />
    )
  }
  return (
    <>
      <div className="relative px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-24 space-y-16">
          {props.imagePosition === ImagePosition.aboveHeading && image}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {props.heading}
            </h1>
          </div>
          {props.imagePosition === ImagePosition.belowHeading && image}
        </div>
      </div>
    </>
  )
}

export default Hero
