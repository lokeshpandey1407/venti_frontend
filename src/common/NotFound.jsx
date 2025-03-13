import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div className="grid h-screen px-4 bg-background place-content-center">
      <div className="text-center">
        <h1 className="font-black text-text-inactive/50 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-text sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <button
          onClick={() => navigate('/')}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white hover:text-button-primary bg-primary rounded hover:bg-transparent focus:outline-none focus:ring hover:ring-1 hover:ring-button-primary transition ease-in-out duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>

  )
}

export default NotFound