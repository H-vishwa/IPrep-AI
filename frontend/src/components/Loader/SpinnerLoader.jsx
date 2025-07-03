import React from 'react'

const SpinnerLoader = () => {
  return (
    <div role="status">
        <svg
            aria-hidden="true"
            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08144e-05 50.5908C9.08144e-05 73.1376 21.4533 94.5911 44.9999 94.5911C68.5466 94.5911 90.0001 73.1376 90.0001 50.5908C90.0001 28.0441 68.5466 6.59082e-05 44.9999 -2.91038e-05C21.4533 -2.91038e-05 -9.08144e-05 21.4533 -9.08144e-05 50.5908Z"
            fill="currentColor"
            />
            <path
            d="M93,50A43,43,0,1,1,50,7a43,43,0,0,1,43,43Zm-7,0A36,36,0,1,0,50,86,36,36,0,0,0,86,50Z"
            fill="currentFill"
            />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  )
}

export default SpinnerLoader