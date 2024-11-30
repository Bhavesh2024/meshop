import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from "../modal/Modal";
import Success from '../modal/Success'
import Error from '../modal/Error'
import { ThemeContext } from '../../context/ThemeContext';
const Account = () => {

  const {username} = useParams();
  const submitRef = useRef(0);
  const {theme} = useContext(ThemeContext)
  const [data,setData] = useState({
    username:'',
    address:{
      suite:'',
      street:'',
      city:'',
      state:'',
    },
    password:'',
  })
  const [address,setAddress] = useState({
    suite:'',
    street:'',
    city:'',
    state:''
  })

  const [togglePassword,setTogglePassword] = useState(false);
  const [isSubmit,setSubmit] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const [isValid,setIsValid] = useState(false);
  const [message,setMessage] = useState({
    error:false,
    success:false,
    text:''
  })
  const [validateInput, setValidateInput] = useState([
    
    {
        username: {
            pattern: /^[A-Za-z0-9_.]{3,15}$/,
            message: 'Username must be between 3 and 15 characters and may contain letters, numbers, dots, and underscores.',
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
        {
            password: {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
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

  const addressKeys = ['suite','street','city','state'];
  const handleInput = (e) =>{
      const {name,value} = e.target;
      
      if(addressKeys.includes(name)){
        setAddress({...address,[name]:value});
        // validateField(name,value);
      } else{
        setData({...data,[name]:value});
      }
      validateField(name,value);
  }

  const handleSubmit = (e) =>{
      e.preventDefault();


      const updateData = {...data,address};
      console.log(updateData);
      setData(updateData);
      updateUser(username,updateData);
      
  }



  const fetchUser = async(username) =>{
      try{
        const response = await axios.get(`https://meshop-r6ed.onrender.com//api/users/${username}`);

        if(response.status == 200){
           setData(response.data);
           setAddress(response.data.address);
        }
      }catch(error){
        setOpenModal(!openModal);
        setMessage({...message,error:true,status:true,text:error.response.data.message})
      }
  }

  const updateUser = async(username,userData) =>{
    try{
      const response = await axios.put(`https://meshop-r6ed.onrender.com//api/users/${username}`,userData);

      if(response.status == 200){
        //  setData(response.data);
        //  setAddress(response.data.address);
        console.log(response.data);
        if(username !== data.username){
          localStorage.setItem('user',data.username);
        }
        setOpenModal(!openModal);
      setMessage({...message,text:response.data.message,success:true})
      }
    }catch(error){
      console.log(error);
        setOpenModal(!openModal);
        setMessage({...message,error:true,status:true,text:error.response.data.message})
    }
  }
  useEffect(() => {
    if(username !== ''){
        fetchUser(username);
    }
    submitRef.current.disabled=true;
  },[])

  useEffect(() =>{
    const anyInvalid = validateInput.some(inputObj => {
      const key = Object.keys(inputObj)[0];
      return !inputObj[key].status;
    });
  
    setIsValid(!anyInvalid); 
  },[validateInput])

  useEffect(()=>{
     !isValid ? submitRef.current.disabled = true : submitRef.current.disabled=false;
  },[isValid])

  // useEffect(() =>{
  //    if(isSubmit){
  //      updateUser(username);
  //      setSubmit(!isSubmit);
  //    }
  // },[isSubmit])

  if(!data) return <div>Loading....</div>
  return (
    <div className='h-60vh flex items-center'>
       <form action="" onSubmit={handleSubmit} className='w-full p-3 flex items-center justify-center'>
         <fieldset className='w-full md:w-2/3 xl:w-2/5 border p-4 rounded-md'>
           <legend className='text-center text-2xl font-bold px-4'>Account</legend>
           <div className='flex flex-col gap-1'>
            <input type="text" name='username' id='username' className={`p-2 border rounded-sm w-full ${(!validateInput[0].username.status) && 'border-red-600'}`} placeholder='Username' onChange={handleInput} value={data.username} required  />
            <div className='text-xs text-red-600'>{!validateInput[0].username.status ? validateInput[0].username.message : ''}</div>
           </div>
           <div className='grid grid-cols-2 gap-2'>
               <div className='my-2'>
                <div className='flex flex-col gap-1'>
               <input type="text" name='suite' id='suite' className={`p-2 border rounded-sm w-full ${(!validateInput[1].suite.status) && 'border-red-600'}`} placeholder='Suite' onChange={handleInput} value={address.suite} required  />            
               <div className='text-xs text-red-600'>{!validateInput[1].suite.status ? validateInput[1].suite.message : ''}</div>
                </div>
                <div className='flex flex-col gap-1'>
               <input type="text" name='street' id='street' className={`p-2 border rounded-sm w-full ${(!validateInput[2].street.status) && 'border-red-600'}`} placeholder='Street' onChange={handleInput} value={address.street} required  />
               <div className='text-xs text-red-600'>{!validateInput[2].street.status ? validateInput[2].street.message : ''}</div>
                </div>
               </div>
               <div className='my-2'>
                <div className='flex flex-col gap-1'>
               <input type="text" name='city' id='city' className={`p-2 border rounded-sm w-full ${(!validateInput[4].city.status) && 'border-red-600'}`} placeholder='City' onChange={handleInput} value={address.city} required  />
               <div className='text-xs text-red-600'>{!validateInput[4].city.status ? validateInput[4].city.message : ''}</div>
                
                </div>
                <div className='flex flex-col gap-1'>
               <input type="text" name='state' id='state' className={`p-2 border rounded-sm w-full ${(!validateInput[3].state.status) && 'border-red-600'}`} placeholder='State' onChange={handleInput} value={address.state} required  />
               <div className='text-xs text-red-600'>{!validateInput[3].state.status ? validateInput[3].state.message : ''}</div>
               
                </div>
               </div>
           </div>
           <div className='flex flex-col gap-1'>
             <div className={`border rounded-sm flex items-center ${theme == 'dark' ? 'text-black bg-white' : 'text-gray-400'}`}>
             <input type={togglePassword ? 'text' : 'password'} name='password' className={`w-full focus:outline-none p-2 ${(!validateInput[5].password.status) && 'border-red-600'}`} id='password' placeholder='Password' onChange={handleInput} value={data.password} required  />
              <i className={`fa-solid ${togglePassword ? 'fa-eye': 'fa-eye-slash'} me-2`} onClick={() => setTogglePassword(!togglePassword)}></i>
             </div>
             <div className='text-xs text-red-600'>{!validateInput[5].password.status ? validateInput[5].password.message : ''}</div>
           </div>
           <div className='mt-3'>
             <button type="submit" name='submit' className='bg-slate-900 rounded-md p-2 text-gray-100 px-4 flex m-auto disabled:bg-gray-300' ref={submitRef} >Submit</button>
           </div>
         </fieldset>
       </form>
       {
       openModal &&
       <Modal open={openModal} onClose={setOpenModal}>
                {
                  !message.error ? <Success message={message.text} onClose={setOpenModal} handler={setMessage} redirect={'/'}/> : <Error handler={setMessage} onClose={setOpenModal} message={message.text} />
                }
       </Modal>
       }
    </div>
  )
}

export default Account
