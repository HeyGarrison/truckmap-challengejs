import React from 'react'
import { ChatStore } from '../store/ChatStore';
import ChatItem from './ChatItem';




const ChatList = () => {
  const data = ChatStore.useState(s => s.chatList ? s.chatList : []);

  return (
    <div className="mx-4 flex-1 flex flex-col-reverse align-bottom overflow-scroll">
      {data.map((item, key) => (
        <ChatItem key={key} data={item} />
      ))}
    </div>
  )
}

export default ChatList
