import React from 'react'
import ReactMarkdown from 'react-markdown'

interface BodyProps {
  body: string
}

const Body: React.FC<BodyProps> = (props: BodyProps) => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-base leading-7 text-gray-700 prose">
          <ReactMarkdown>{props.body}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}

export default Body
