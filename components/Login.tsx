import React, { ChangeEvent, FormEvent, ReactEventHandler, useState } from 'react'
import { UserStore } from '../store/UserStore';

interface Props {

}

const Login = (props: Props) => {
  const [value, setValue] = useState<string>('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem('email', value);
    UserStore.update(s => {
      s.email = value;
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign in / Sign up
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={onSubmit} className="space-y-6" >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
          </label>
            <div className="mt-1">
              <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
