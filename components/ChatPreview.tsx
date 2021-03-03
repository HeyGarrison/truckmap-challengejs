import React, { useEffect, useState } from 'react'

interface Props {
  url: string
}

const ChatPreview = (props: Props) => {
  const [detail, setDetail] = useState({ images: [], favicons: [], title: '', description: '', url: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generateMetaInfo?url=${props.url}`, {}).then(response => {
      return response.json()
    }).then(data => {
      console.log(data);
      setDetail({ ...data, isLoading: false })
      setIsLoading(false)
    })
  }, [props.url])



  return (
    <a href={detail.url} target="_blank">
      <div className="bg-gray-100 border flex overflow-hidden rounded-lg mt-4">
        {(() => {
          if (isLoading) {
            return (
              <svg className="ml-5 mt-5 animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )
          }

          return (
            <>
              {(() => {
                if (detail.images[0]) {
                  return <img className="h-20" src={detail.images[0]} />
                }
                if (detail.favicons[0]) {
                  return <img className="h-20" src={detail.favicons[0]} />
                }

              })()}
              <div className="w-full flex-grow-1 p-4">
                <p className="text-base font-medium">{detail.title ? detail.title : detail.url}</p>
                <p className="text-sm line-clamp-1">{detail.description}</p>
              </div>
            </>
          )
        })()}
      </div>
    </a>
  )
}

export default ChatPreview
