import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// const UserActivityDropDown = lazy(() => import("../../dropdown/UserActivityDropDown"));

import Modal from "../../modal/Modal";
import Login from "../../form/Login";
import CartModal from "../../modal/CartModal";
import { ErrorBoundary } from "react-error-boundary";
import UserActivityDropDown from "../../dropdown/UserActivityDropDown";
import axios from "axios";
import PermissionModal from "../../modal/PermissionModal";
import Error from "../../modal/Error";
import { useDispatch, useSelector } from "react-redux";
import cart from "../../../redux/cart";
import { combineSlices } from "@reduxjs/toolkit";
import { initUserCartData } from "../../../redux/features/cartSlice";
import { ThemeContext } from "../../../context/ThemeContext";
import { logoutAdmin } from "../../../admin/AdminPanel";
const Navbar = () => {
	const userRef = useRef(null);
	const {theme,setTheme} = useContext(ThemeContext)
	const [dropdownToggle, setDropdownToggle] = useState(false);
	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [openCart, setOpenCart] = useState(false);

	const navigate = useNavigate();
	if (userRef !== null) {
		console.log(userRef.current);
	}
	const [login, setLogin] = useState(false);
	const [alertModal, setAlertModal] = useState(false);
	const [errorModal, setErrorModal] = useState(false);
	const [cartProductCount, setCartProductCount] = useState(0);
	const [errorMessage, setErrorMessage] = useState({
		success: false,
		error: false,
		message: "",
	});
	const { username } = useParams();
  const user = localStorage.getItem('user');
	const cartData = useSelector(
		(state) => state.productCart[username] || { cart: [] }
	);
	const dispatch = useDispatch();
	// console.log(cartData);
	// const cartData = useSelector((state) => state.productCart[username] || { cart: [] });
	// console.log(cartData)
  
	const isLogin = () => {
		if (
			localStorage.getItem("user") !== "" &&
			localStorage.getItem("user") !== null &&
			localStorage.getItem("isLogin")
		) {
			return setLogin(true);
		}
		return setLogin(false);
	};

	// const getCartCount = async() =>{
	// 	const user = localStorage.getItem('user');
	// 	try{
	// 		const response = await axios.get(`https://meshop-hx32.onrender.com/api/users/${user}/cart`);
	// 		if(response.status == 200){
	// 				setCartProductCount(response.data.cart.length);
	// 		}
	// 	}catch(e){
	// 		console.log(e);
	// 	}
	// }
	useEffect(() => {
		isLogin();
		// getCartCount();
		
      // const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // if (systemPrefersDark) {
      //   theme == 'dark' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
			// 	setTheme('dark')
      // } else {
			// 	document.documentElement.classList.remove('dark');
			// 	setTheme('light')
      // }
			if(theme == 'light'){
				document.documentElement.classList.remove('light');
				
			}
      if(user == 'admin' && localStorage.getItem('isLogin')){
					setLogin(localStorage.getItem('isLogin'))
			}
		dispatch(initUserCartData({ username: localStorage.getItem("user") }));
	}, []);
	const customerActivityList = [
		{
			icon: <i className="fa-solid fa-home"></i>,
			link: `/user/${
				username !== undefined ? username : localStorage.getItem("user")
			}`,
			item: "Home",
		},
		{
			icon: <i class="fa-solid fa-address-card"></i>,
			link: `/user/${
				username !== undefined ? username : localStorage.getItem("user")
			}/account`,
			item: "Account",
		},
		{
			icon: <i className="fa-solid fa-shopping-cart"></i>,
			link: `/user/${
				username !== undefined ? username : localStorage.getItem("user")
			}/cart`,
			item: "My Cart",
		},
	];

	const adminActivityList = [
		{
			item:"Dashboard",
			link:`/user/admin`,
			icon:<i className="material-symbols-outlined">dashboard</i>
		}
	]

	const handleLoginModal = () => {
		setOpenLoginModal(!openLoginModal);
	};

	const handleCart = () => {
		if (!login) {
			// alert("You are not login yet");
			setErrorMessage({
				...errorMessage,
				error: true,
				message: "You are not Login yet",
			});
			setErrorModal(true);
		} else {
			username == undefined
				? navigate(`/user/${localStorage.getItem("user")}/cart`)
				: navigate(`/user/${username}/cart`);
		}
	};

	const logOutUser = async () => {
		try {
			console.log(username);
			const response = await axios.post(
				"https://meshop-hx32.onrender.com/api/users/logout",
				{ username: username }
			);
			if (response.status == 200) {
				localStorage.setItem("user", "");
				localStorage.setItem("isLogin", "");
				navigate("/");
			}
		} catch (e) {
			console.log(e.response.data.message);
			setErrorMessage({
				...errorMessage,
				error: true,
				message: e.response.data.message,
			});
			setErrorModal(true);
		} finally {
			setAlertModal(false);
		}
	};

	const toggleTheme = () =>{
		// theme == 'dark' ? setTheme('light') : setTheme('dark')
		if(theme == 'dark'){
			document.documentElement.classList.remove('dark')
			//  setTheme('light')
		}else{
			document.documentElement.classList.add('dark')
			// setTheme('dark')
		}
		setTheme(theme == 'light' ? 'dark' : 'light')
	}
	return (
		<nav className={`flex justify-between md:justify-around items-center h-20  ${theme == 'light' ? 'bg-gray-200' : 'border-b text-white bg-slate-800'} px-4 `}>
			<div className="flex items-center gap-5">
				<div className="logo">
					<h1 className="text-4xl font-mono font-bold">MeShop</h1>
				</div>
			</div>
			<div className=" gap-5 items-center flex ">
				{/* <div className="relative bg-white rounded-full items-center hidden md:flex ">
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search products.."
						className="py-2 px-4 bg-transparent focus:outline-none placeholder:text-xs"
					/>
					<i className="fa-solid fa-magnifying-glass me-3"></i>
				</div> */}
				{!login && (
					<div className="gap-3 hidden md:flex">
						<Link
							to={"/auth/signup"}
							className="bg-sky-500 text-white py-2 px-4 rounded-full text-sm"
						>
							Sign Up
						</Link>
						<Link
							to={"/auth/login"}
							className="bg-rose-500 text-white py-2 px-4 rounded-full text-sm"
						>
							Login
						</Link>
					</div>
				)}

				<div className="gap-3 text-xl items-center flex ">
					{/* <i className="fa-solid fa-magnifying-glass "></i> */}
					<i className={`fa-solid ${theme == 'dark' ? 'fa-sun' : 'fa-moon'} hover:text-gray-500`} onClick={toggleTheme}></i>
					<div className="relative">
						<i
							className="fa-solid fa-shopping-cart hover:text-gray-500"
							onClick={handleCart}
						></i>
						{cartData.cart.length != 0 && (
							<span
								className=" bg-indigo-200 rounded-full h-5 w-5 p-2 flex items-center justify-center absolute top-0 end-0 -mt-2 -me-3"
								style={{ fontSize: "10px" }}
							>
								{cartData.cart.length}
							</span>
						)}
					</div>

					{login ? (
						// <div id="dropdown-root" className="flex flex-col relative items-center">
						// <ErrorBoundary fallback={<div></div>}>
						// {/* <Suspense fallback={<div>..</div>} > */}

						// <UserActivityDropDown
						// 	open={dropdownToggle}
						// 	activityList={customerActivityList}
						// 	classes={"bg-white text-sm absolute top-9 p-2 text-center rounded px-5 border"}
						// >
						// 	<div>Hello World</div>
						// </UserActivityDropDown>

						// {/* </Suspense> */}

						// </ErrorBoundary>
						<div className="relative">
							<i
								className="fa-solid fa-user-circle text-blue-500 text-3xl"
								id="dropdown"
								ref={userRef}
								onClick={() =>
									setDropdownToggle(!dropdownToggle)
								}
							></i>
							{dropdownToggle && (
								<div className="absolute w-full flex justify-end">
									<ul className="text-sm bg-white px-5 p-2 border rounded-md w-fit flex m-auto flex-col gap-1 z-10 relative start-3 md:start-9 ">
										
										{user == 'admin' ? adminActivityList.map((value) =>(
											<>
												<Link
												to={value.link} className="text-slate-500 flex items-start">
													{value.icon}&nbsp;{value.item}
												</Link>
											</>
										)) :customerActivityList.map((value) => (
											<>
												<li>
													<Link
														to={value.link}
														className="text-slate-500 flex items-center"
													>
														{value.icon}&nbsp;
														{value.item}
													</Link>
												</li>
											</>
										))}
										<li className="flex justify-center px-1">
											<button
												className="text-slate-500  flex items-center w-full"
												onClick={() =>
													setAlertModal(true)
												}
											>
												<i class="fa-solid fa-right-from-bracket text-lg"></i>{" "}
												&nbsp;Logout
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					) : (
						<i
							className="fa-solid fa-user-circle text-blue-500 text-3xl inline-block md:hidden"
							onClick={handleLoginModal}
						></i>
					)}
				</div>
			</div>
			{openLoginModal && (
				<Modal
					open={openLoginModal}
					onClose={setOpenLoginModal}
					style={{
						position: "fixed",
						zIndex: 10,
						background: "white",
						width: "100%",
					}}
				>
					<div className="">
						<Login />
					</div>
				</Modal>
			)}
			{openCart && (
				<Modal open={openCart} onClose={setOpenCart}>
					<CartModal />
				</Modal>
			)}

			{alertModal && (
				<Modal open={alertModal} onClose={setAlertModal}>
					<PermissionModal
						title={"Logout"}
						message={"Are you sure to Logout ? "}
						positiveAction={user == 'admin' ? logoutAdmin : logOutUser}
						onClose={setAlertModal}
					/>
				</Modal>
			)}
			{errorModal && (
				<Modal open={errorModal} onClose={setErrorModal}>
					<Error
						message={errorMessage.message}
						onClose={setErrorModal}
						handler={setErrorMessage}
					/>
				</Modal>
			)}
			{/* <i className="fa-solid fa-bars inline-block md:hidden"></i> */}
		</nav>
	);
};

export default Navbar;
