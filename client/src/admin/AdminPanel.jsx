import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/layout/Navbar/AdminNavbar";
import Sidebar from "../components/layout/Drawer/Sidebar";
import SideBarContext from "../context/SideBarContext";
import { createPortal } from "react-dom";
import Content from "../components/layout/Content/Content";
import Footer from "../components/layout/Footer/Footer";
import Modal from "../components/modal/Modal";
import PermissionModal from "../components/modal/PermissionModal";
import axios from 'axios'
export const logoutAdmin = async() =>{
	const user = localStorage.getItem('user');
	try{
		const response = await axios.post('https://meshop-r6ed.onrender.com/admin/logout',{username:user},{withCredentials:true});
		if(response.status == 200){
			localStorage.setItem('isLogin',false);
			localStorage.setItem('user','');
			
			navigate('/user/admin/login');
		}
	}catch(e){
		console.log(e);
	}
}
const AdminPanel = () => {
	const [isLogin,setIsLogin] = useState(false);
	const navigate = useNavigate();
  const user = localStorage.getItem('user');
	const [open,setOpen] = useState(false);
	const checkIsLogin = async() =>{
		try{
			const response = await axios.post('https://meshop-r6ed.onrender.com/admin/auth',{username:user},{withCredentials:true});
			if(response.status == 200){
				 console.log('hello')
			
				 setIsLogin(true);

			 }else{
				 setIsLogin(false);
			 }
		}catch(e){
			console.log(e);
		}
	}

	useEffect(()=>{
			checkIsLogin();
	},[])

	// if(!isLogin) return <div>Not Found</div>
	return (
		isLogin && <div className="relative">
			<SideBarContext>
				<div className="flex ">
					{/* {createPortal(<Sidebar />, document.getElementById("root"))} */}
					<Sidebar open={open} setOpen={setOpen} />
					<div className="flex flex-col w-full">
						<AdminNavbar open={open} setOpen={setOpen} />
						<Content>
							<div className="flex items-center justify-center w-full box-border h-dvh overflow-y-scroll scrollbar-none">
								<div className="overflow-x-auto w-fit m-auto scrollbar-none">
									<Outlet />
								</div>
							</div>
							{/* <div className="w-full fixed bottom-0 my-0">
								<Footer />
							</div> */}
						</Content>
					</div>
				</div>
			</SideBarContext>

			<Modal open={open} onClose={setOpen}>
					<div className="bg-white w-72 ">
						<PermissionModal onClose={setOpen} title={'Logout'} message={'Are you sure to logout ?'} positiveAction={logoutAdmin}  />
					</div>
				</Modal>
		</div>
	);
};

export default AdminPanel;
