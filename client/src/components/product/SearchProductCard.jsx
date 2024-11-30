import React, { Suspense, useContext, useEffect, useState } from "react";
import { fetchProductData, LazyProductImageComponent } from "./ProductCard";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import AddToCartBtn from "./AddToCartBtn";
import LoadImage from "../Fallback/LoadImage";
import ProductCardFallback from "../Fallback/ProductCardFallback";
const SearchProductCard = ({productId}) => {
	const [searchProductData,setSearchProductData] = useState(null);
	const {theme} = useContext(ThemeContext)
	useEffect(() =>{
		fetchProductData(searchProductData,setSearchProductData,productId)
	},[])

	if(searchProductData == null){
		return <ProductCardFallback />
	}
	return (
		<>
		{
			searchProductData !== null &&
			<div className="flex justify-between flex-col md:flex-row gap-5 border shadow-xl w-full py-4 md:p-10">
				<div className="flex items-center gap-5">
					<div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3">
						{" "}
						{/* <img
							src={searchProductData.image}
							alt=""
							className="max-h-44 min-h-40"
						/> */}
						<Suspense fallback={<LoadImage />}>
							<LazyProductImageComponent src={searchProductData.image} className={'max-h-44 min-h-40'}/>
						</Suspense>
					</div>
					<div>
						<div className="font-semibold text-xl my-2">
							{searchProductData.product_name}
						</div>
						{/* <div className="bg-green-500 inline px-3 py-1 rounded-full text-sm text-gray-100 font-bold">
							4.3 <i className="fa-solid fa-star text-xs"></i>
						</div> */}
						<div>
							<ul className="text-sm list-disc ms-5 flex flex-col gap-2">
								{/* <li>8 GB RAM | 256 GB ROM</li>
								<li>16.94 cm (6.67 inch) Display</li>
								<li>50MP + 13MP + 10MP | 32MP Front Camera</li>
								<li>5000 mAh Battery</li>
								<li>
									Snapdragon 7 Gen 1 Accelerated Edition
									Processor
								</li>
								<li>
									Handset, USB Type-C Cable, Guides, Sim Tool,
									TurboPower 68W Charger, Protective Case
								</li> */}
								{
									searchProductData.detailed_specifications.map((value) => (
										 
											Object.entries(value).map(([key,value]) =>(
												<>
														<li>{value}</li>
												</>
											))
										 
									))
								}
							</ul>
						</div>
					</div>
				</div>
				<div className="items-center flex flex-row justify-center md:flex-col flex-wrap gap-1">
					<div className="text-2xl font-semibold">₹{searchProductData.final_price}</div>
					<div className="flex gap-2 items-center">
						<span className="line-through text-slate-500">
						₹{searchProductData.price}
						</span>
						<span className="text-xs bg-slate-900 text-white p-1 px-2 rounded-full">{searchProductData.discount}% off</span>
					</div>
					<div className="flex gap-3 items-center flex-row md:flex-col">
					<Link to={`/product/${productId}`} className={`${theme == 'dark' ? 'bg-indigo-700': 'bg-zinc-300'} p-2 px-5 rounded-lg font-semibold`}>
						View Detail
					</Link>
				<AddToCartBtn productId={productId} style="bg-gradient-to-r from-slate-900 to-gray-800 rounded-md py-3 px-5 text-white inline-block w-fit text-sm"/>
					
					</div>
				</div>
			</div>
		}
		</>
	);
};

export default SearchProductCard;
