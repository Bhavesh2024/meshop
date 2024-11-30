import React from "react";
import { createPortal } from "react-dom";
const Modal = ({ children, open, onClose, style,closeIcon=true }) => {
	if (open) {
		document.body.setAttribute(
			"class",
			"max-h-dvh scrollbar-none overflow-y-auto"
		);
	}
	return createPortal(
		open && (
			<div className="modal fixed w-full h-screen overflow-scroll scrollbar-none top-0 start-0 bg-slate-900 flex justify-center items-center bg-opacity-55" onClick={() => onClose(false)}>
				<div
					className="modal-content"
					style={style}
				
				>
					<div className="relative h-fit text-black" onClick={(e) => e.stopPropagation()}>
					{
						closeIcon &&
					<i
						className="fa-solid fa-xmark text-xl absolute top-0 end-0 me-3 mt-2"
						onClick={() => onClose(false)}
					></i>
					}
					{children}
					</div>
				</div>
			</div>
		),
		document.body
	);
};

export default Modal;
