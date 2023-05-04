import React from 'react'

interface BodyProps {
  body: string
}

const Body: React.FC<BodyProps> = (props: BodyProps) => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-base leading-7 text-gray-700">
          <p>{props.body}</p>
        </div>
      </div>
    </>
  )
}

export default Body
