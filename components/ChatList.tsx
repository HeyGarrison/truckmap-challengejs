import React, { useEffect } from 'react'


interface Props {
  data: any[]
}

const ChatList = (props: Props) => {
  console.log(props.data);

  return (
    <div className="mx-4 flex-1 flex flex-col-reverse align-bottom overflow-scroll">
      {props.data.map((item, key) => (
        <div className="text-sm mb-4 text-gray-800" key={key}>
          <div><span className="font-bold">{item.email}</span></div>
          <p className="leading-normal">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default ChatList
