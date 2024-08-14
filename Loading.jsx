import React from 'react'
import loader from '../../../public/loading.gif'

const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center bg-black'>
        <img className='w-1/3' src={loader} alt="" />
    </div>
  )
}

export default Loading