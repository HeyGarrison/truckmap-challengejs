import Head from 'next/head'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: String
}

const Layout = (props: Props) => {
  return (
    <div className="w-full bg-white max-w-screen-md relative mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sm:shadow-lg h-screen flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 flex justify-center py-3 border-b">
          <div className="text-gray-800 text-lg">{props.title}</div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default Layout
