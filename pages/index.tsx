import React, { useEffect, useState } from 'react'
import ChatList from '../components/ChatList'
import Layout from '../components/Layout'
import { Chat, LayoutPage } from '../next-env'
import ChatInput from '../components/ChatInput';
import useSocket from '../hooks/useSocket';
import Login from '../components/Login';
import { UserStore } from '../store/UserStore';
import { ChatStore } from '../store/ChatStore';
import { OnlineListStore } from '../store/OnlineListStore';


const Home: LayoutPage = () => {

  const socket = useSocket();
  const userEmail = UserStore.useState(s => s.email);

  useEffect(() => {
    if (socket && userEmail) {
      socket.emit('online-user', userEmail)

      socket.on('chat', (data: Chat) => {
        ChatStore.update(s => {
          s.chatList = s.chatList ? [data, ...s.chatList] : [data]
        });
      })

      socket.on('online-user', (onlineUsers) => {
        console.log(onlineUsers);
        OnlineListStore.update(s => {
          s.data = onlineUsers
        });
      })

      socket.on('offline-user', (onlineUsers) => {
        console.log(onlineUsers)
        OnlineListStore.update(s => {
          s.data = onlineUsers
        })
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket, userEmail])

  function onSuccess(text: string) {
    socket.emit('chat', { text: text, email: userEmail, createdAt: new Date() })
  }

  return (
    <React.Fragment>
      <ChatList />
      <ChatInput onSuccess={(text: string) => onSuccess(text)} />
    </React.Fragment>
  )
}

Home.getLayout = (page) => <Layout title="Chat Room">{page}</Layout>

export default Home
