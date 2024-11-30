import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../modal/Modal";
import PermissionModal from "../modal/PermissionModal";
import PaginationControl from "./PaginationControl";

const UserDataTable = () => {
	const [userData, setUserData] = useState([]);
	const [openModal,setOpenModal] = useState(false);
	const [username,setUsername] = useState('');
	const [index,setIndex] = useState(0)
	const [slicedRowData,setSlicedRowData] = useState([]);
	const fields = [
		"ID",
		"USERNAME",
		"NAME",
		"BIRTH DATE",
		"AGE",
		"GENDER",
		"ADDRESS",
		"PHONE",
		"EMAIL",
		"PASSWORD",
		"T & C",
		"STATUS",
		"DELETE",
	];

	const createPagination = (data, rows,setSlicedRowData) => {
    const isArray = Array.isArray(data);
    const dividedDataArr = [];
    let totalDataLength = 0;
    console.log(data);
    // console.log(isObject)
    if (isArray){
        totalDataLength = data.length;
        console.log('hello' + data.length)
        console.log('length ' + totalDataLength)
        if(totalDataLength > 3){
					let minIndex = 0,
maxIndex = rows;
           data.map((value,index) =>{
            // console.log(value)
              if(minIndex == index){
							   console.log(minIndex)
								 console.log(maxIndex)
                  if(dividedDataArr.length !== 0){
										dividedDataArr.map((arr) =>{
											
											console.log('hello page')
                       if(arr.length < rows && arr.length != rows){
                          let currentIndex = index;
													console.log('my index ' + currentIndex)
                         while(arr.length != rows){
                          arr.push(data[currentIndex]);
                          currentIndex += 1;
                         }
                         minIndex = currentIndex;
                         maxIndex = rows + minIndex;
                       }
                     })
                  }
                  dividedDataArr.push(data.slice(minIndex,maxIndex));
                  minIndex = maxIndex;
                  maxIndex = minIndex + rows;
									console.log(maxIndex)
                }
              });
							console.log(dividedDataArr)
              setSlicedRowData(dividedDataArr);
        }
    }
  
    // console.log(slicedRowData);
  };

	const fetchUserData = async () => {
		const response = await axios.get('https://meshop-r6ed.onrender.com/api/users');

		try {
			if (response.status === 200) {
				const data = response.data;
				setUserData(
					Object.entries(data).map(([username, value], index) => ({
						id: index + 1,
						username,
						...value,
					}))
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const joinAddress = (address) => {
		return `${address.suite}, ${address.street}, ${address.city}, ${address.state}`;
	};

	const handleUser = (username) =>{
		 	setOpenModal(!openModal);
			setUsername(username);
	}
	const handleRemove = async() => {
		
		try{

			const response = await axios.delete(`https://meshop-r6ed.onrender.com/api/users/${username}`)

			if(response.status == 200){
						// setUserData(response.data.user);
						fetchUserData();
						setOpenModal(false);
						// console.log('hello')
			}
		}catch(error){
			console.log(error);
		}
		
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	useEffect(() =>{
			if(userData.length !== 0 && slicedRowData.length == 0){
				 createPagination(userData,5,setSlicedRowData)
			}
	},[userData])


	return (
		<div className="w-full p-5">
			<table className="text-nowrap table-auto border border-gray-500">
				<thead className="border-b border-red-300 p-2">
					<tr>
						{fields.map((field, index) => (
							<th key={index} className="p-2">
								{field}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{slicedRowData.length !== 0 && slicedRowData.map((value,key) => (
						key == index && 
						value.map((user) => (

						<tr
							key={user.id}
							className={`border-b border-slate-500 ${
								user.id % 2 == 0 ? "bg-gray-200 text-black" : ""
							}`}
						>
							<td className="p-2">{user.id}</td>
							<td className="p-2">{user.username}</td>
							<td className="p-2">{user.fname + " " + user.lname}</td>
							<td className="p-2">{user.dob}</td>
							<td className="p-2">{user.age}</td>
							<td className="p-2">{user.gender}</td>
							<td className="p-2">{joinAddress(user.address)}</td>
							<td className="p-2">{user.phone}</td>
							<td className="p-2">{user.email}</td>
							<td className="p-2">{user.password}</td>
							<td className="p-2">
								{user.isAgree ? "Accept" : "Decline"}
							</td>
							<td className="p-2">
								{user.isLogin ? "Active" : "Offline"}
							</td>
							<td>
								<button
									onClick={() => handleUser(user.username)}
								>
									Remove
								</button>
							</td>
						</tr>
						))
					))}
				</tbody>
			</table>
			<PaginationControl slicedRowData={slicedRowData} activeIndex={index} setActiveIndex={setIndex}/>
			<Modal open={openModal} onClose={setOpenModal}>
				   { openModal &&
							<PermissionModal title={'Delete'} message={'Are You Sure to Delete'} onClose={setOpenModal} positiveAction={handleRemove} />
					 }
			</Modal>
		</div>
	);
};

export default UserDataTable;