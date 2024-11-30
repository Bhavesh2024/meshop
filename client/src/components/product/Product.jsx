import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import ProductCarousel from "../layout/Slider/ProductCarousel";
import SuggestionCard from "./SuggestionCard";
// import {ReactStars} from 'react-stars'
import { fetchProductData, LazyProductImageComponent } from "./ProductCard";
import ProductCardFallback from "../Fallback/ProductCardFallback";
import LoadPage from "../Fallback/LoadPage";
import LoadImage from "../Fallback/LoadImage";
const Product = () => {
	const { id } = useParams();
	const [productData, setProductData] = useState(null);
	let key = "";
	const getProductDetail = async (id) => {
		try {
			const response = await axios.get(
				`https://meshop-hx32.onrender.com/api/products/id/${id}`
			);

			if (response.status == 200) {
				console.log(response.data);
				setProductData(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (id != "") {
			getProductDetail(id);
		}
	}, []);

	useEffect(() => {
		if (productData == null) {
			fetchProductData(productData, setProductData, id);
		}
	}, [productData]);
	return (
		<>
			<Navbar />
			<div className="min-h-screen overflow-auto scrollbar-none">
				{productData !== null ? (
					<>
						<div className="flex items-center min-h-72 flex-col md:flex-row">
							<div className="w-full md:w-1/3 h-60 md:h-80">
								{/* <img
									src={productData.image}
									alt="product Image"
									className="w-full h-full"
								/> */}
								<Suspense fallback={<LoadImage />}>
									<LazyProductImageComponent src={productData.image} className={'w-full h-full'}/>
								</Suspense>
							</div>
							<div className="flex flex-col gap-2 w-full p-3">
								<h1 className="text-2xl font-semibold">
									{productData.product_name} (
									{productData.brand})
								</h1>
								<p>{productData.description}</p>
								<div className="flex gap-1 items-baseline flex-wrap">
									<h2 className="text-xl font-semibold">
										Price :
									</h2>
									<span className="text-xl">
									₹{productData.final_price} /
									</span>
									<span className="line-through text-slate-400 text-xs ">
									₹{productData.price}
									</span>
									<span
										className={`${
											productData.stock_status !=
											"Out of Stock"
												? "text-green-500"
												: "text-red-600"
										}`}
									>
										({productData.stock_status})
									</span>

									{/* <span></span> */}
								</div>
								<div></div>
								<div>
									<button className="p-2 px-5 bg-yellow-400 rounded-full">
										Buy Now
									</button>
								</div>
							</div>
						</div>
						<div className="m-2">
							<table className="w-full">
								{productData.detailed_specifications.map(
									(value, index) => (
										<>
											{Object.entries(value).map(
												([key, value]) => (
													<tr className="border">
														<th className="border-r text-end p-1">
															{key}
														</th>
														<td className="px-4">
															{value}
														</td>
													</tr>
												)
											)}
										</>
									)
								)}
							</table>
						</div>
						<div className="flex w-full md:w-11/12 flex-col m-auto">
							<ProductCarousel
								category={`${productData.category}s`}
								label={"Suggested Product"}
								productData={productData}
								setProductData={setProductData}
								autoPlay={true}
								autoPlaySpeed={1500}
								infinite={true}
							>
								<SuggestionCard
									productId={productData.product_id}
								/>
							</ProductCarousel>
						</div>
					</>
				) : (
					<LoadPage />
				)}
			</div>
			<Footer />
		</>
	);
};

export default Product;
