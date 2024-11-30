import { createContext, useState } from "react";

export const ProductContext = createContext(0);

const ProductContextProvider = ({ children }) => {
	const productDataObj = {
		product_id: "",
		category: "",
		image: "",
		product_name: "",
		brand: "",
		price: "",
		discount: "",
		final_price: "",
		description: "",
		detailed_specifications: [],
		ratings: 0,
		stock_status: "",
		warranty: "",
	}
	const [productData, setProductData] = useState(productDataObj);
	const [productSpecification, setProductSpecification] = useState([]);
	const [image,setImage] = useState('');
	return (
		<>
			<ProductContext.Provider
				value={{
					productData,
					setProductData,
					productSpecification,
					setProductSpecification,
					productDataObj,
					image,setImage
				}}
			>
				{children}
			</ProductContext.Provider>
		</>
	);
};

export default ProductContextProvider;
