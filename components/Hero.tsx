import React from 'react'
import Image from 'next/image'

interface ImageReference {
  imageId: string
  width: number
  height: number
  altText: { en: string; de: string }
}

enum ImagePosition {
  aboveHeading = 'aboveHeading',
  belowHeading = 'belowHeading',
}

interface HeroProps {
  lang: string
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
        src={`https://placehold.co/${props.image.width}x${
          props.image.height
        }.png?text=${encodeURI(props.image.imageId)}`}
        alt={props.image.altText[props.lang]}
        width={props.image.width}
        height={props.image.height}
        quality={95}
      />
    )
  }
  return (
    <>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 space-y-16">
          {props.imagePosition === ImagePosition.aboveHeading && image}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {props.heading[props.lang]}
            </h1>
          </div>
          {props.imagePosition === ImagePosition.belowHeading && image}
        </div>
      </div>
    </>
  )
}

export default Hero
