import { Transition } from '@headlessui/react'
import React, { useState } from 'react'
import { OnlineListStore } from '../store/OnlineListStore';

interface Props {

}

const OnlineUsers = (props: Props) => {
  const data = OnlineListStore.useState(s => s.data ? s.data : {})
  const isOpen = OnlineListStore.useState(s => s.isOpen ? s.isOpen : false)

  console.log(isOpen)

  return (
    <Transition show={isOpen}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <Transition onClick={() => OnlineListStore.update(s => { s.isOpen = false })} show={isOpen} className="fixed inset-0 transition-opacity" enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </Transition>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
          <Transition
            show={isOpen}
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <h3 className="pb-4 leading-6 text-gray-900 border-b">
              Online Users
            </h3>
            <ul className="divide-y divide-gray-200">
              {Object.keys(data).map(key => {
                return (
                  <li key={key} className="py-4">
                    <p className="text-sm font-medium text-gray-900">{data[key]}</p>
                    <p className="text-sm text-gray-500">{key}</p>
                  </li>
                )
              })}
            </ul>
          </Transition>
        </div>
      </div>
    </Transition>
  )
}

export default OnlineUsers
