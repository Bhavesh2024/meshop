import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/modal/Modal";
import Error from "../components/modal/Error";
import Success from "../components/modal/Success";
import axios from "axios";
import 'dotenv'
const AdminLogin = () => {
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
		token:localStorage.getItem('token')
	});

	const [togglePassword, setTogglePassword] = useState(false);
	const [message,setMessage] = useState({
		text:"",
		error:false,
		success:false,
	})

	const [openModal,setOpenModal] = useState(false);
	let [username,setUsername] = useState('');

	const handleInput = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};

	const handleAdminLogin = async() =>{
		try{
			const request = await axios.post('https://meshop-r6ed.onrender.com//admin/login',loginData,{withCredentials:true});
			if(request.status == 200){
				localStorage.setItem('user','admin');
				localStorage.setItem(
					'isLogin',true
				)
				setMessage({...message,error:false,success:true,text:request.data.message});
				 setOpenModal(!openModal);
			}
		} catch(e){
			if(e.response.data.message){
				setMessage({...message,error:true,text:e.response.data.message})
				setOpenModal(!openModal)
			}
		}
		 
	}
	const handleSubmit = async (e) => {
		e.preventDefault();

		handleAdminLogin();
		
	}

	return (
		<div>
			<form className="flex justify-center min-h-dvh items-center p-3" onSubmit={handleSubmit}>
				<fieldset className="flex flex-col gap-3 border p-5 rounded-md w-11/12 sm:w-10/12 md:w-2/3 lg:w-1/2 xl:w-1/3 relative">
					<legend className="text-center px-3 text-3xl font-bold">
						Login
					</legend>
					<div className="grid grid-cols-1">
						<input
							type="text"
							name={"username"}
							id="username"
							value={loginData.username}
							placeholder="Username"
							className="border px-4 py-3 rounded-md"
							onChange={handleInput}
							required
						/>
					</div>
					<div className="grid grid-cols-1 relative items-center">
						<input
							type={!togglePassword ? "password" : "text"}
							id="password"
							name="password"
							placeholder="Password"
							className="border px-4 py-3 rounded-md "
							value={loginData.password}
							onChange={handleInput}
							required
						/>
						<i
							className={`fa-solid ${
								!togglePassword ? "fa-eye" : "fa-eye-slash"
							} absolute end-0 me-2`}
							onClick={() => setTogglePassword(!togglePassword)}
						></i>
					</div>
					<div className="my-1 px-3 flex justify-between text-xs md:text-sm">
						<Link to={"/auth/signup"}>Create New Account</Link>
						<Link to={"#"}>Forgot Password?</Link>
					</div>
					<button
						type="submit"
						name="submit"
						className="btn bg-gray-800 w-24 py-2 rounded-md text-white m-auto"
					>
						Submit
					</button>
				</fieldset>
			</form>
			{
				<Modal open={openModal} onClose={setOpenModal}>
					
						{
							message.error ? <Error message={message.text} handler={setMessage} onClose={setOpenModal}  /> : <Success message={message.text} handler={setMessage} onClose={setOpenModal} redirect={`/user/${loginData.username}/`}/>
						}
				</Modal>
			}
		</div>
	);
};

export default AdminLogin;
