import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SweetAlert2 from 'react-sweetalert2'
import Modal from "../modal/Modal";
import axios from "axios";
import Error from "../modal/Error";
import Success from "../modal/Success";
// import 'sweetalert2/src/scss/s'
const SignUp = () => {
// 	const validationPatterns = {
//     fname: /^[A-Za-z]+$/,               // First Name (letters only, no spaces)
//     lname: /^[A-Za-z]+$/,               // Last Name (letters only, no spaces)
//     phone: /^[0-9]{10}$/,               // Phone (exactly 10 digits)
//     username: /^[A-Za-z0-9_.]{3,15}$/,  // Username (alphanumeric, with underscores and dots, 3-15 characters)
//     password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, // Strong password validation
//     email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email
//     suite: /^[A-Za-z0-9\s,.'-]{1,100}$/,  // Suite
//     street: /^[A-Za-z0-9\s,.'-]{1,100}$/, // Street
//     state: /^[A-Za-z\s]{1,100}$/,       // State (letters and spaces)
//     city: /^[A-Za-z\s]{1,100}$/,        // City (letters and spaces)
// };


 // Form states 
 const userObj = {
	fname: "",
	lname: "",
	dob: "",
	gender: "",
	age: 0,
	address:{},
	phone: "",
	username: "",
	email: "",
	password: "",
	isAgree: false,
 }

 const addressObj = {
	suite:"",
	street:"",
	state:"",
	city:"",
 }

 const genderRef = useRef(0);
 const formRef = useRef(0);
	const [formData, setFormData] = useState(userObj);

  const [addressData,setAddressData] = useState(addressObj
	)
	const [togglePassword, setTogglePassword] = useState(false);
	const [isChecked,setIsChecked] = useState(false);
	const [openModal,setOpenModal] = useState(false);
	const [message,setMessage] = useState({
		status:false,
		text:'',
		error:false,
		success:false,
	})

	const [validateInput, setValidateInput] = useState([
    {
        fname: {
            pattern: /^[A-Za-z]+$/,
            message: 'First Name must contain only letters and no spaces.',
            status: true,
        },
    },
    {
        lname: {
            pattern: /^[A-Za-z]+$/,
            message: 'Last Name must contain only letters and no spaces.',
            status: true,
        },
    },
    {
        phone: {
            pattern: /^[0-9]{10}$/,
            message: 'Phone number must contain exactly 10 digits.',
            status: true,
        },
    },
    {
        username: {
            pattern: /^[A-Za-z0-9_.]{3,15}$/,
            message: 'Username must be between 3 and 15 characters and may contain letters, numbers, dots, and underscores.',
            status: true,
        },
    },
    {
        password: {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
            status: true,
        },
    },
    {
        email: {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Email must be a valid email address.',
            status: true,
        },
    },
    {
        suite: {
            pattern: /^[A-Za-z0-9\s,.'-]{1,100}$/,
            message: 'Suite can contain letters, numbers, spaces, commas, periods, and dashes.',
            status: true,
        },
    },
    {
        street: {
            pattern: /^[A-Za-z0-9\s,.'-]{1,100}$/,
            message: 'Street can contain letters, numbers, spaces, commas, periods, and dashes.',
            status: true,
        },
    },
    {
        state: {
            pattern: /^[A-Za-z\s]{1,100}$/,
            message: 'State can contain letters and spaces.',
            status: true,
        },
    },
    {
        city: {
            pattern: /^[A-Za-z\s]{1,100}$/,
            message: 'City can contain letters and spaces.',
            status: true,
        },
    },
]);

const validateField = (field, value) => {
	const updatedValidation = validateInput.map((item) => {
			if (item[field]) {
					return {
							...item,
							[field]: {
									...item[field],
									status: item[field].pattern.test(value),
							},
					};
			}
			return item;
	});

	setValidateInput(updatedValidation);
};

	const addressKeys = ["suite", "street", "city", "state"];
	const handleInput = (e) => {
		const { name, value,placeholder } = e.target;
		// if(validateInput.map){
			// 	console.log('hello')
			// 	 if(value != ''){
				// 		 validationPatterns[name].test(value) ? setValidateInput({...validateInput,message:'',status:false}) : setValidateInput({...validateInput,message:`${placeholder} is not in valid format`,status:true})
				// 	 }
				// }
				if(!addressKeys.includes(name))
				{
					setFormData({ ...formData, [name]: value });
					
				}else{
			// const splitAddress = addressData.name.split
			setAddressData({ ...addressData, [name]: value });
		}
		 if(value != ''){

			 validateField(name,value);
		 }
	};

	const getAge = (birthDate) =>{
		 const today = new Date();
		 const dob = new Date(birthDate);

		 const diff = today.getFullYear() - dob.getFullYear();
		//  console.log(diff)
		 return diff
	}
	const handleSubmit = async(e) =>{
		  e.preventDefault()
			// const userData = [formData,addressData];
			let userData = {}
			// if(!formData.address){
				//  if(typeof(userData) == "object"){
					// 		console.log(userData)
					// 	}
					// }
					let isValidAllData = true;
					console.log("validate" + validateInput.includes(false));
					const result = Object.entries(validateInput).map(([key,value]) => {
						 console.log(value)
						 Object.entries(value).map(([key,value]) =>{
							 if(!value.status){
								 return isValidAllData = false;
	
							 }
						 })
					})
					console.log(result)
					console.log("valid" + isValidAllData)
					// console.log("validate" + Object.values(validateInput).some(value => Object.ent(value).includes(false)));
					if(isValidAllData)
						{
							// console.log(userData[0] + " \n " + userData[1]);
							
							const userAge = getAge(formData.dob)
							// console.log(typeof(userAge))
							// console.log(userAge >= 18)
							if((userAge >= 18)){
					setFormData({...formData,address:addressData,age:userAge,isAgree:isChecked});
					console.log('hello')
				if(formData.address){
					userData = formData
					console.log(userData)

						// console.log(request.status)
						try{
								 const request = await axios.post('http://localhost:5000/user/auth',{userData})
								 console.log(request.data.message);
									if(request.status == 200){
										//  console.log(request.statusText)
										//  console.log('hello')
										const responseMessage = request.data.message;
										setFormData(userObj);
									setAddressData(addressObj);
									// setIsChecked(false);
								  //  genderRef.current.checked=false;
									formRef.current.reset();
										setMessage({...message,status:true,success:true,text:responseMessage})
										setOpenModal(!openModal);
									}
								}catch(e){
									if(e.status >= 400 && e.status < 500){
										const errorMessage = e.response.data.message;
										console.log(e.response.data.message);
										setMessage({...message,status:true,error:true,text:errorMessage})
										setOpenModal(!openModal);
									}
									//  console.log(e)
								}
					}
				}
				else{
				 setMessage({...message,status:true,error:true,text:'You are not eligible to register'})
					setOpenModal(!openModal);
			 }
			}else{
				setMessage({...message,status:true,error:true,text:"Please Fill Out All Fields"})
										setOpenModal(!openModal);
			}
	}
	return (
		<div>
			<form className="flex justify-center h-dvh overflow-auto scrollbar-none p-3 relative" onSubmit={handleSubmit} ref={formRef}>
				<fieldset className="flex flex-col gap-3 border p-5 rounded-md w-full h-fit md:w-2/3 lg:w-1/2 xl:w-1/3 relative">
					<legend className="text-center px-3 text-3xl font-bold">
						Sign Up
					</legend>
					<div className="grid md:grid-cols-2 gap-4">
						<div className="w-full">
						<input
							type="text"
							name="fname"
							id="fname"
							value={formData.fname}
							placeholder="First Name"
							className={`border px-4 py-3 rounded-md w-full ${formData.fname != '' ? !validateInput[0].fname.status? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						{!validateInput[0].fname.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[0].fname.message}</p>}
						
						</div>
						<div className="w-full">
						<input
							type="text"
							name="lname"
							id="lname"
							value={formData.lname}
							placeholder="Last Name"
							className={`border px-4 py-3 rounded-md w-full ${formData.lname != '' ? !validateInput[1].lname.status ? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						{!validateInput[1].lname.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[1].lname.message}</p>}

						</div>
					</div>
					<div className="grid grid-cols-1">
						<input
							type="date"
							name="dob"
							id="dob"
							className="border px-4 py-3 rounded-md "
							value={formData.dob}
							onChange={handleInput}
							required
						/>
					</div>
					<div className="flex justify-center items-center h-12 gap-4">
						<div className="flex gap-1">
							<input
								type="radio"
								id="male"
								name="gender"
								value={"male"}
								onChange={handleInput}
								ref={genderRef}
								required
							/>
							<label htmlFor="male">Male</label>
						</div>
						<div className="flex gap-1">
							<input
								type="radio"
								id="female"
								name="gender"
								value={"female"}
								onChange={handleInput}
								ref={genderRef}
								required
							/>
							<label htmlFor="female">Female</label>
						</div>
						<div className="flex gap-1">
							<input
								type="radio"
								id="other"
								name="gender"
								value={"other"}
								ref={genderRef}
								onChange={handleInput}
								required
							/>
							<label htmlFor="other">Other</label>
						</div>
					</div>
					<div className="grid md:grid-cols-2 gap-3">
						<div>
						<input
							type="text"
							name="suite"
							id="suite"
							value={addressData.suite}
							placeholder="Suite"
							className={`border px-4 py-3 rounded-md w-full ${addressData.suite != '' ? !validateInput[6].suite.status ? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						{!validateInput[6].suite.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[6].suite.message}</p>}
						</div>
						<div>
						<input
							type="text"
							name="street"
							id="street"
							value={addressData.street}
							placeholder="Street"
							className={`border px-4 py-3 rounded-md w-full ${addressData.street != '' ? !validateInput[7].street.status? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						{!validateInput[7].street.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[7].street.message}</p>}

						</div>
					</div>
					<div className="grid md:grid-cols-2 gap-3">
						<div><input
							type="text"
							name="city"
							id="city"
							value={addressData.city}
							placeholder="City"
							className={`border px-4 py-3 rounded-md w-full ${addressData.city != '' ? !validateInput[9].city.status ? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						
						{!validateInput[9].city.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[9].city.message}</p>}
						</div>
						<div>
						<input
							type="text"
							name="state"
							id="state"
							value={addressData.state}
							placeholder="State"
							className={`border px-4 py-3 rounded-md w-full ${addressData.state != '' ? !validateInput[8].state.status ? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							required
						/>
						{!validateInput[8].state.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[8].state.message}</p>}
						</div>
					</div>
					<div className="grid grid-cols-1">
						<input
							type="tel"
							name="phone"
							id="phone"
							value={formData.phone}
							placeholder="Phone Number"
							className={`border px-4 py-3 rounded-md w-full ${formData.phone != '' ? !validateInput[2].phone.status ? 'border-red-500' : 'border-green-500' : ''}`}

							onChange={handleInput}
							required
						/>
						{!validateInput[2].phone.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[2].phone.message}</p>}
					</div>
					<div className="grid grid-cols-1">
						<input
							type="text"
							name="username"
							id="username"
							value={formData.username}
							placeholder="Username"
							className={`border px-4 py-3 rounded-md w-full ${formData.username != '' ? !validateInput[3].username.status ? 'border-red-500' : 'border-green-500' : ''}`}

							onChange={handleInput}
							required
						/>
						{!validateInput[3].username.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[3].username.message}</p>}

					</div>
					<div className="grid grid-cols-1">
						<input
							type="email"
							name="email"
							id="email"
							value={formData.email}
							placeholder="Email"
							className={`border px-4 py-3 rounded-md w-full ${formData.email != '' ? !validateInput[5].email.status ? 'border-red-500' : 'border-green-500' : ''}`}

							onChange={handleInput}
							required
						/>
						{!validateInput[5].email.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[5].email.message}</p>}
					</div>
					<div className="grid grid-cols-1 relative items-center">
						<div className="relative flex items-center">
						<input
							type={!togglePassword ? "password" : "text"}
							id="password"
							name="password"
							placeholder="Password"
							className={`border px-4 py-3 rounded-md w-full ${formData.password != '' ? !validateInput[4].password.status ? 'border-red-500' : 'border-green-500' : ''}`}
							onChange={handleInput}
							value={formData.password}
							required
						/>
						<i
							className={`fa-solid ${
								!togglePassword ? "fa-eye" : "fa-eye-slash"
							} absolute end-0 me-2`}
							onClick={() => setTogglePassword(!togglePassword)}
						></i>

						</div>
						{!validateInput[4].password.status && <p className="text-xs text-red-600 ms-2 mt-1">{validateInput[4].password.message}</p>}
					</div>
					<div className="flex justify-between items-center">
						<div className="flex gap-1 items-center">
							<input
								type="checkbox"
								name="isAgree"
								id="isAgree"
								value={isChecked}
								onClick={() => setIsChecked(!isChecked)}
								// checked
								required
							/>
							<label htmlFor="isAgree">
								<a
									href="#"
									className="text-sm text-wrap text-gray-500"
								>
									Accept Term & Condition
								</a>
							</label>
						</div>
					</div>
					<button
						type="submit"
						name="submit"
						className="btn bg-gray-800 w-24 py-2 rounded-md text-white m-auto"
					>
						Submit
					</button>
					<div className="text-sm text-gray-500 text-center mt-6">
						Have an Account ?&nbsp;
						<Link to={"/auth/login"}>Login</Link>
					</div>
				</fieldset>
			</form>
			 <Modal open={openModal} onClose={setOpenModal}>
				{
					console.log(message.error)

				}
						  {
								(message.status && message.error) ? <Error message={message.text} handler = {setMessage} onClose={setOpenModal} /> : <Success message={message.text} handler={setMessage} onClose={setOpenModal}/>
							}
				</Modal>
		</div>
	);
};

export default SignUp;
