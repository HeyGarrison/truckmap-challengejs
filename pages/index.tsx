import React, { useEffect, useState } from 'react'
import ChatList from '../components/ChatList'
import Layout from '../components/Layout'
import { LayoutPage } from '../next-env'
import { io, Socket } from "socket.io-client";
import { PullstateCore } from '../stores/PullstateCore';
import ChatInput from '../components/ChatInput';



const Home: LayoutPage = () => {
  const [chatData, setChatData] = useState([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      // setSocket(io());
      // const socket = io()
      setSocket(io());

    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('connect')
      })

      socket.on('chat', data => {
        setChatData(prev => [data, ...prev])
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  function onSuccess(text: String) {
    socket.emit('chat', { text: text, email: 'garrison@hey.com' })
  }


  return (
    <React.Fragment>
      <ChatList data={chatData} />
      <ChatInput onSuccess={(text: String) => onSuccess(text)} />
    </React.Fragment>
  )
}

Home.getLayout = (page) => <Layout title="Chat Room">{page}</Layout>

export default Home
