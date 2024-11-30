import React from 'react'

const PermissionModal = ({title,message,onClose,positiveAction,data}) => {
  return (
    <div className="bg-white flex flex-col w-72">
									  <div className="flex items-center h-10 font-bold text-xl border-b ps-3">
											{title}
										</div>
										<div className="py-5 px-2 flex items-center">
											{message}
										</div>
										<div className="flex gap-1 justify-end">
												<button className="text-blue-500 p-3" onClick={positiveAction}>Yes</button>
												<button className="text-blue-500 p-3" onClick={() => onClose(false)}>No</button>
										</div>
							</div>
  )
}

export default PermissionModal
