import React, { lazy, Suspense, useEffect, useState } from "react";
// import ProductCard from "../../product/ProductCard";
const ProductCard = lazy(() => import('../../product/ProductCard'));
import CartProduct from "../../product/CartProduct";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import axios from "axios";
// import SuggestionCard from "../../product/SuggestionCard";
import ProductContextProvider from "../../../context/ProductContext";
import ProductCardFallback from "../../Fallback/ProductCardFallback";
import LazyComponent from "../../../routes/LazyComponent";
const SuggestionCard = LazyComponent(() => import('../../product/SuggestionCard'),<ProductCardFallback />)
const ProductCarousel = ({category,children,label,autoPlaySpeed,autoPlay,infinite,productData,setProductData}) => {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 1248 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 1248, min: 1024 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};
	const [products,setProducts] = useState(null);

	const fetchProducts = async () =>{
		console.log(category)
		try{
			const response = await axios.get(`https://meshop-hx32.onrender.com/api/products/category/${category}`,{withCredentials:true});

			if(response.status == 200){
				// console.log(response.data);
				setProducts(response.data)
			}
		}catch(error){
				console.log(error);
		}
	}
	useEffect(() => {
    fetchProducts();
	},[])

	if(products == null){
		return <ProductCardFallback />
	}
	return (
		 <>
		  <div className="flex justify-between my-3">
					<h1 className="text-2xl font-semibold capitalize">{label}</h1>				
			</div>
			<ProductContextProvider>
		  <Carousel showDots={false} responsive={responsive} className="h-fit z-0" autoPlay={autoPlay} autoPlaySpeed={autoPlaySpeed} infinite={infinite}>
								{
									products !== null && products.map(value => (
										
											 !children ? <Suspense fallback={<ProductCardFallback />}><ProductCard productId={value.product_id} /></Suspense> : <SuggestionCard productId={value.product_id} data={productData} handler={setProductData}/>
										
							
									))
								}
			</Carousel>
			</ProductContextProvider>
		 </>
		
	);
};

export default ProductCarousel;
