import React, { FormEvent, useState } from 'react'

interface Props {
  onSuccess: Function
}

const ChatInput = (props: Props) => {
  const [value, setValue] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    props.onSuccess(value)
    setValue('')
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email" className="sr-only">Send message</label>
      <div className="pb-6 px-4 flex-none">
        <div className="flex rounded-lg border-2 border-gray-300 overflow-hidden">
          <input autoComplete="off" value={value} onChange={(e) => setValue(e.target.value)} type="text" className="form-input border-0 w-full px-4" placeholder="Send a message" />
          <button className="text-3xl text-gray-500 border-l-2 border-gray-300 p-2 focus:outline-none">
            <svg className="fill-current h-6 w-6 block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChatInput
