import React, { act, useContext, useRef, useState } from "react";
import { ToggleSidebarContext } from "../../../context/SideBarContext";
import UserActivityDropDown from "../../dropdown/UserActivityDropDown";
import { Link } from "react-router-dom";

const AdminNavbar = ({open,setOpen}) => {
	const { toggleSidebar, setToggleSidebar } =
		useContext(ToggleSidebarContext);

	const [toggleDropDown, setToggleDropDown] = useState(false);
	const dropDownRef = useRef(0);
	
	return (
		<>
			<nav className="bg-slate-600 text-gray-200 h-20 flex justify-between px-5 items-center w-full">
				<div className="flex items-center gap-4 text-xl">
					<i
						className="fa-solid fa-bars inline-block"
						onClick={() => setToggleSidebar(!toggleSidebar)}
					></i>
					<Link to={'/'} className="text-gray-200"><i className="fa-solid fa-house"></i></Link>
				</div>
				<div className="flex gap-4 text-xl items-center">
					<i className="fa-solid fa-gear"></i>
					<i className="fa-solid fa-bell"></i>
					<div className="relative">

					<i
						className="fa-solid fa-user-circle text-2xl relative"
						onClick={() => setToggleDropDown(!toggleDropDown)} ref={dropDownRef}
						id="admin"
					>
						
					</i>
					{
						toggleDropDown &&
					<div className="absolute w-full flex justify-end">
							 <ul className="text-sm bg-white px-5 p-2 border rounded-md w-fit flex m-auto flex-col gap-1 z-10 relative start-3 md:start-5">
										{/* {
											activities.map(value =>(
												<>
													<li><Link to={value.link} className="text-slate-500 flex items-center">{value.icon}&nbsp;{value.item}</Link></li>
												</>
											))
										} */}
										<li className="flex justify-center"><button className="text-slate-500  flex items-center justify-center" onClick={() => setOpen(!open)}><i class="fa-solid fa-right-from-bracket"></i> &nbsp;Logout</button></li>
							 </ul>
						</div>
					}
					</div>
				</div>
			</nav>
		</>
	);
};

export default AdminNavbar;
