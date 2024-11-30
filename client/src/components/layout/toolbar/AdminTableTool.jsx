import React, { useContext, useState } from "react";
import Modal from "../../modal/Modal";
// import ProductDetailForm from "../../form/ProductDetailForm";
import ProductContextProvider, { ProductContext } from "../../../context/ProductContext";
import axios from "axios";
import { ProductTableContext } from "../../../context/ProductTableContext";
import LazyComponent from "../../../routes/LazyComponent";
import LoadImage from "../../Fallback/LoadImage";
// import { useSelector } from "react-redux";
const ProductDetailForm = LazyComponent(()=> import('../../form/ProductDetailForm'),<LoadImage />)
const AdminTableTool = ({data,handler}) => {
	const [openModal, setOpenModal] = useState(false);
	const {productTableData,setProductTableData,fetchProducts} = useContext(ProductTableContext)
	// const [filter,setFilter] = useState('');
	
	const handleFilter = (e) =>{
			const {name,value} = e.target;
			handler(value);
			fetchProducts(value);
			// fetchDataFromCategory(value);
		  
	}
	return (
		<div className="flex justify-between my-3 px-4">
			<h1 className="text-2xl font-semibold">Product</h1>
			<div className="flex gap-2">
				<button
					className="bg-blue-500 text-white p-2 px-4 rounded-md"
					onClick={() => setOpenModal(!openModal)}
				>
					<i className="fa-solid fa-plus text-sm"></i> Add
				</button>
				<select
					name="filter"
					id="filter"
					value={data}
					className="border px-1"
					onChange={handleFilter}
				>
					<option value="" selected disabled>
						Select Filter
					</option>
					<option value="All" name="">
						All
					</option>
					<option value="smartTvs" name="filter">
						Smart TV
					</option>
					<option value="smartphones" name="filter">
						Smart Phone
					</option>
					<option value="headphones" name="filter">
						Headphone
					</option>
				</select>
			</div>
			<Modal open={openModal} onClose={setOpenModal} closeIcon={false}>
				<div className="w-screen">
					<ProductContextProvider>
						<ProductDetailForm closeModal={setOpenModal}/>
					</ProductContextProvider>
				</div>
			</Modal>
		</div>
	);
};

export default AdminTableTool;
