import React from 'react'
import ReactMarkdown from 'react-markdown'

interface TextProps {
  lang: string
  body: { en: string; de: string }
}

const Text: React.FC<TextProps> = (props: TextProps) => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-base leading-7 text-gray-700 prose">
          <ReactMarkdown>{props.body[props.lang]}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export default Text
