import React, { useEffect, useRef } from 'react'
import { ChatStore } from '../store/ChatStore';
import ChatItem from './ChatItem';

const ChatList = () => {
  const data = ChatStore.useState(s => s.chatList ? s.chatList : []);
  const ref = useRef(null)

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [ref, data])

  return (
    <div ref={ref} className="mx-4 mt-4 flex-1 flex flex-col align-bottom overflow-scroll">
      {data.map((item, key) => (
        <ChatItem key={key} data={item} />
      ))}
      <div ref={ref}></div>
    </div>
  )
}

export default ChatList
