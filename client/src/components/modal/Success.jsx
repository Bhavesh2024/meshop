import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Success = ({message,handler,onClose,redirect}) => {
  const navigate = useNavigate();
  const handleSuccess = () => {
    handler((prev) => ({...prev,success:false,message:'',status:false}));
    onClose(false);
    navigate(redirect)
  }
  return (
    <>
    <div className='bg-white w-fit flex items-center justify-between flex-col  gap-3 p-4'>
      <div className='flex justify-center items-center w-full my-5'>
          <DotLottieReact src='https://lottie.host/a51f5ed9-202b-4609-a46d-577d43663dad/hKTlG0p0f1.json' autoplay />
      </div>
      <h1 className='text-2xl text-start text-nowrap my-2'><i className="fa-solid fa-success"></i>&nbsp; {message} </h1>
      <button onClick={handleSuccess} className='bg-slate-700 text-white w-20 py-2'>Ok</button>
     </div>
    </>
  )
}

export default Success
