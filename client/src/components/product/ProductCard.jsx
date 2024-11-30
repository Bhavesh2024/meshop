import axios from "axios";
import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import AddToCartBtn from "./AddToCartBtn";
import { ThemeContext } from "../../context/ThemeContext";
import LoadImage from "../Fallback/LoadImage";

export const fetchProductData = async(data,handler,id) =>{
	try{
		const response = await axios.get(`https://meshop-r6ed.onrender.com/api/products/id/${id}`)
		if(response.status == 200){
				console.log( response.data);
				
				handler(prevData => ({ ...prevData, ...response.data }));
				
		}
	}catch(e){
		// console.log(e)
	}
}


export const LazyProductImageComponent = lazy(() => {
	 return new Promise((resolve) =>{
		setTimeout(()=>{
			resolve({
				default:(props) =>(
					<img {...props}/>
				)

			}
			)
		},1000)
	 })
})
const ProductCard = ({productId}) => {
	const {theme,setTheme} = useContext(ThemeContext)
	const [productData,setProductData] = useState({});
	const cart = useSelector((state) => state.productCart)
	const {username} = useParams();
	const dispatch = useDispatch();
	useEffect(() =>{
			fetchProductData(productData,setProductData,productId);
	},[])
	// fetchProductData()

	


	return (
		<div className={`border rounded-sm w-11/12 flex flex-col justify-center items-center ${theme == 'light' ? `bg-[url('../../../images/card-bg.jpg')]` : 'text-white dark:bg-slate-900'} p-0`}>
			<div className="w-full">
				{/* <img
					src={`${productData !== null ? productData.image : ""}`}
					alt=""
					className="h-48 w-full"
					loading="lazy"
				/> */}
				<Suspense fallback={<LoadImage />} >
							<LazyProductImageComponent src={`${productData !== null ? productData.image : ""}`} className={'h-48 w-full'}/>
				</Suspense>
			</div>
			<div className="text-center">
				<div className="text-md font-semibold text-nowrap">
					<Link to={`/product/${productId}`}> {productData.product_name} </Link>
				</div>
				<div>
					<span className="text-xl font-semibold text-slate-600">
					₹{productData.price}
					</span>
					<span className="text-md underline-offset-4 text-slate-500 line-through">
						&nbsp;{productData.final_price}
					</span>
					{/* <div>
						<span className="text-xs border rounded-full inline-block p-1 px-2 bg-gray-300">
							25% off
						</span>
					</div> */}
				</div>
				<div className="text-sm px-3 my-1">
					{productData.description ? productData.description.slice(0,100) : productData.description}
				</div>
				{/* <button className=" bg-gradient-to-r from-slate-900 to-gray-800 rounded-full py-2 px-5 text-white inline-block w-fit text-sm my-3" onClick={handleProduct}>
					Add to Cart
				</button> */}
				<AddToCartBtn productId={productId}/>
			</div>
		</div>
	);
};

export default ProductCard;
