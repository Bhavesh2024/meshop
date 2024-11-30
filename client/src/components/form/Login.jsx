import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import Error from "../modal/Error";
import Success from "../modal/Success";
import axios from "axios";
const Login = ({user}) => {
	const [loginData, setLoginData] = useState({
		user: "",
		password: "",
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('hello')
		try{
			  
				const response = await axios.post('http://localhost:5000/user/login',loginData)
				if(response.status == 200){
					// console.log(response.data.message);
					// console.log(response.data.username)
					setUsername(response.data.username);
					setLoginData({...loginData,user:"",password:""});
					if(loginData.user && loginData.password){

						setMessage({...message,text:response.data.message,success:true})
						setOpenModal(!openModal);
						localStorage.setItem('isLogin',true);
					}
				}
				
		}catch(e){
			   const error = e.response.data.message;
				console.log(e)
					setMessage({...message,text:error,error:true})
					setOpenModal(!openModal);
		}
	}

	const moveToHome = () =>{
		 const navigate = useNavigate();

		 navigate('/');
	}


	useEffect(() => {
		if(username != ''){
			localStorage.setItem('user',username)
			// setOpenModal(!openModal);
		}
		
	},[username,message])
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
							name={"user"}
							id="user"
							value={loginData.user}
							placeholder="Username or Email"
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
							onChange={handleInput}
							value={loginData.password}
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
				<Modal open={openModal} onClose={setOpenModal} style={{zIndex:50}}>
					{ 
						console.log(username)
					}
						{
							message.error ? <Error message={message.text} handler={setMessage} onClose={setOpenModal}  /> : <Success message={message.text} handler={setMessage} onClose={setOpenModal} redirect={`/user/${username}/`}/>
						}
				</Modal>
			}
		</div>
	);
};

export default Login;
