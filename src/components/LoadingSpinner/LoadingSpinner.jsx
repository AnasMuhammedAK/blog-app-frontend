import React from 'react'
import {HashLoader} from 'react-spinners'
function LoadingSpinner() {
  return (
    <div className='flex items-center justify-center  h-screen w-full '>
       <HashLoader
  color="#4ADE80"
  size={50}
  speedMultiplier={1}
/>
    </div>
  )
}

export default LoadingSpinner