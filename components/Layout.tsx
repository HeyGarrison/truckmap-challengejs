import Head from 'next/head'
import React, { ReactNode, useEffect, useState } from 'react'
import { OnlineListStore } from '../store/OnlineListStore';
import { UserStore } from '../store/UserStore'
import Login from './Login';
import OnlineUsers from './OnlineUsers';



interface Props {
  children: ReactNode
  title: string
}

const Layout = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = UserStore.useState(s => s.email);

  useEffect(() => {
    UserStore.update(s => { s.email = localStorage.getItem("email") })
    setIsLoading(false);
  }, [])

  return (
    <div className="w-full bg-white max-w-screen-md relative mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OnlineUsers />
      <div className="sm:shadow-lg h-screen flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 flex justify-center items-center py-3 border-b">
          <div className="text-gray-800 text-lg">{props.title}</div>
          <button className="text-xs text-gray-700 ml-2" onClick={() => OnlineListStore.update(s => { s.isOpen = true })} type="button">Who is online?</button>
        </div>
        {(() => {
          if (isLoading) {
            return (
              <div>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
            )

          }

          if (!userEmail) {
            return <Login />
          }

          return (
            <>
              {props.children}
            </>
          )

        })()}
      </div>
    </div>
  )
}

export default Layout
