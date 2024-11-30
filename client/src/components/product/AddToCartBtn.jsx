import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";
const AddToCartBtn = ({ productId,style = '' }) => {
	const [isInCart, setIsInCart] = useState(false);
	const username = localStorage.getItem("user");
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const fetchUserCart = async () => {
		try {
			const response = await axios.get(
				`https://meshop-hx32.onrender.com/api/users/${username}/cart`
			);
			if (response.status == 200) {
				if (response.data.cart.length != 0) {
					if (response.data.cart.includes(productId)) {
						setIsInCart(true);
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleProduct = () => {
		if (username != "" && username != null && username != undefined) {
			console.log(username);
			dispatch(addToCart({ productId, username }));
			setIsInCart(true);
		} else {
			alert("You are not login");
		}
	};

	useEffect(() => {
		fetchUserCart();
	}, [isInCart]);
	return (
		<>
			{!isInCart ? (
				<button
					className={`${style == '' ? 'bg-gradient-to-r from-slate-900 to-gray-800 rounded-full py-2 px-5 text-white inline-block w-fit text-sm my-3 border' : style}`}
					onClick={handleProduct}
				>
					Add to Cart
				</button>
			) : (
				<button
					className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-md py-2 px-5 text-white inline-block w-fit text-sm my-3"
					onClick={() => navigate(`/user/${username}/cart`)}
				>
					{" "}
					Go to Cart
				</button>
			)}
		</>
	);
};

export default AddToCartBtn;
