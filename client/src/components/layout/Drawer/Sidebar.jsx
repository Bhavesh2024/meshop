import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { ToggleSidebarContext } from "../../../context/SideBarContext";
import Modal from "../../modal/Modal";
import PermissionModal from '../../modal/PermissionModal'
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";
const Sidebar = ({open,setOpen}) => {
	const { toggleSidebar, setToggleSidebar } =
		useContext(ToggleSidebarContext);
  const {theme} = useContext(ThemeContext);
	// const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const activities = [
		{
			name: "Dashboard",
			icon: <i className="material-symbols-outlined">dashboard</i>,
		},
		{
			name: "User",
			icon: <i className="fa-solid fa-users"></i>,
		},
		{
			name: "Product",
			icon: <i className="fa-solid fa-cart-flatbed"></i>,
		},
	];

	
	return (
		<>
			<div
				className={`w-1/2 md:w-2/5 lg:w-1/5 xl:w-2/12 bg-transparent top-0 fixed z-10 transition-transform duration-300 ease-linear 
					${!toggleSidebar ? "-translate-x-full " : "translate-x-0"}`}
			>
				<div
					className={`${theme == 'light' ? 'bg-slate-100' : 'bg-slate-800'} h-dvh max-h-dvh flex w-full justify-center relative`}
				>
					<ul className="w-fit text-lg mt-9">
						{activities.map((value, index) => (
							<li key={index}>
								<NavLink
									to={`/user/admin/${
										value.name != "Dashboard"
											? value.name.toLowerCase()
											: ""
									}${
										value.name != "Dashboard" &&
										value.name !== "Account"
											? "s"
											: ""
									}`}
									className={({ isActive }) =>
										isActive ? "text-indigo-600" : ""
									}
								>
									{value.icon}&nbsp; {value.name}
								</NavLink>
							</li>
						))}
					</ul>
					<i
						className={`fa-solid fa-greater-than h-fit p-2 px-3 w-fit text-sm text-gray-50 bg-slate-700 rounded-full absolute top-1/2 transform ${
							toggleSidebar ? "-end-2" : "end-0"
						} md:-end-3 z-20 ms-24 flex  cursor-pointer`}
						onClick={() => setToggleSidebar(!toggleSidebar)}
					></i>
					<button
						className="absolute bottom-0 h-14 bg-slate-600 text-gray-50 w-full text-lg"
						onClick={() => setOpen(!open)}
					>
						<i className="fa-solid fa-right-from-bracket"></i>
						&nbsp;Logout
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
