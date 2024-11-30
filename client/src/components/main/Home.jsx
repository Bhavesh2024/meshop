import React, { useEffect, useState } from "react";
import ProductCarouselContainer from "../layout/Slider/ProductCarouselContainer";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import NotFound from "../../routes/NotFound";
import { useDispatch,useSelector } from "react-redux";
import { initUserCartData } from "../../redux/features/cartSlice";
import cart from "../../redux/cart";
const Home = ({ withCarousel }) => {
	const navigate = useNavigate();
	// const { username } = useParams();
	const {user} = useParams();
	const username = user !== undefined ? user : localStorage.getItem('user')
	const cartInitData = useSelector(initUserCartData)
	console.log(cartInitData)
	const dispatch = useDispatch();
	const checkLogin = async (path = "") => {
		const user = localStorage.getItem("user");
		console.log(user);

		if (user) {
			try {
				const request = await axios.get(
					`https://meshop-hx32.onrender.com/api/users/${user}`,{withCredentials:true}
				);

				if (request.status === 200) {
					console.log(request.data);

					// Use navigate instead of redirect
					if (path !== "") {
						navigate(path); // navigate to the specified path
					} else {
						navigate(`/user/${user}`); // Default navigation
					}
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			return false;
		}
	};

	useEffect(() => {
		// Trigger the checkLogin function when the component mounts
		!withCarousel && checkLogin();
		dispatch(() => initUserCartData({username}));
	}, []); // Empty dependency array means it will run once on mount



	if ((username != "" || username != null) && withCarousel) {
		if (username != localStorage.getItem("user") || localStorage.getItem("isLogin") == '') {
			return <NotFound />;
		}
	}
	return (
		<div>
			<Navbar />
			{!withCarousel ? <ProductCarouselContainer /> : <Outlet />}
			{/* {withCarousel &} */}
			{/* <ProductCard productId="MSE005" /> */}
			<Footer/>
		</div>
	);
};

export default Home;
