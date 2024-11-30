import React from 'react'

const Error = ({message,handler,onClose}) => {
  const handleError = () =>{
    handler((prev) => ({...prev,error:false,status:false}))
    onClose(false) 

  }
  return (
    <>
     <div className='bg-white w-72 flex items-center justify-between flex-col h-40 gap-3 p-4'>
      <h1 className='text-2xl text-start'><i className="fa-solid fa-error"></i>&nbsp; Error</h1>
      <p>{message}</p>
      <button onClick={handleError} className='bg-slate-700 text-white w-20 py-2'>Ok</button>
     </div>
    </>
  )
}

export default Error
