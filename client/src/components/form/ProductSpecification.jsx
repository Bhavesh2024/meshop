import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductContext } from "../../context/ProductContext";
import Modal from "../modal/Modal";

// Component for handling individual specification item editing
const SpecificationItem = ({ value, onEdit, onDelete }) => (
	<div className="flex items-center mb-2">
		<input
			type="text"
			value={value}
			onChange={(e) => onEdit(e.target.value)}
			className="w-full p-2 rounded-md border"
		/>
		<button
			type="button"
			onClick={onDelete}
			className="ml-2 text-red-500 hover:text-red-700"
		>
			<i className="fas fa-trash-alt"></i>
		</button>
	</div>
);

// Main Product Specification Form Component
const ProductSpecification = ({ data, handler, info, form }) => {
	const [inputValues, setInputValues] = useState({});
	// const [newSpecInput, setNewSpecInput] = useState("");
	const [open,setOpen] = useState(false);
	const { productSpecification, setProductSpecification } =
		useContext(ProductContext);
	console.log(data);
	// Handle change for specification input
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setInputValues((prev) => ({ ...prev, [name]: value }));
	};

	// Add new value to the specification
	const addSpecificationValue = (key) => {
		if (inputValues[key]) {
			handler((prevSpecs) =>
				prevSpecs.map((spec) =>
					Object.keys(spec)[0] === key
						? { [key]: [...(spec[key] || []), inputValues[key]] }
						: spec
				)
			);
			setInputValues((prev) => ({ ...prev, [key]: "" }));
		}
	};

	// Edit a specific specification item
	const editSpecificationValue = (key, index, newValue) => {
		handler((prevSpecs) =>
			prevSpecs.map((spec) =>
				Object.keys(spec)[0] === key
					? {
							[key]: spec[key].map((val, i) =>
								i === index ? newValue : val
							),
					  }
					: spec
			)
		);
	};

	// Delete a specific specification item
	const deleteSpecificationValue = (key, index) => {
		setProductSpecification((prevSpecs) =>
			prevSpecs.map((spec) =>
				Object.keys(spec)[0] === key
					? { [key]: spec[key].filter((_, i) => i !== index) }
					: spec
			)
		);
	};

	// Submit all specifications to main product data
	const handleSubmit = () => {
		info((prev) => ({
			...prev,
			detailed_specifications: productSpecification,
		}));
		// setProductSpecification(productSpecification);
		console.log("Updated Specifications:", productSpecification);
		setOpen(!open)

	};

	useEffect(()=>{
		console.log(productSpecification)
	},[])
	return (
		<div className="w-full">
			<h3 className="mb-4 text-xl font-bold">Product Specifications</h3>
			{productSpecification.map((spec, index) => {
				const key = Object.keys(spec)[0];
				return (
					<div key={index} className="mb-4">
						<h4 className="font-semibold mb-2">{key}</h4>
						{spec[key].map((value, i) => (
							<SpecificationItem
								key={i}
								value={value}
								onEdit={(newValue) =>
									editSpecificationValue(key, i, newValue)
								}
								onDelete={() =>
									deleteSpecificationValue(key, i)
								}
							/>
						))}
						<div className="flex items-center">
							<input
								type="text"
								name={key}
								value={inputValues[key] || ""}
								onChange={handleInputChange}
								placeholder={`Add ${key}`}
								className="w-full p-2 rounded-md border"
							/>
							<button
								type="button"
								onClick={() => addSpecificationValue(key)}
								className="ml-2 text-blue-500 hover:text-blue-700"
							>
								<i className="fas fa-plus-circle"></i>
							</button>
						</div>
					</div>
				);
			})}

			<button
				type="button"
				name="submit"
				className="bg-slate-900 text-white p-2 px-5 rounded-md mt-4"
				onClick={handleSubmit}
			>
				Save
			</button>

			<h4 className="mt-4">Specifications Data:</h4>
			<pre className="bg-gray-100 p-2 rounded">
				{JSON.stringify(data, null, 2)}
			</pre>
		<Modal open={open} onClose={setOpen}>
					<div className="bg-white flex flex-col gap-3 justify-center items-center h-36 px-5">
						<span></span>
							<span className="text-sm">Specification Saved Successfully</span>
							<button onClick={() => setOpen(!open)} className="bg-slate-800 text-white px-5 py-2 rounded-md w-fit">OK</button>
					</div>
		</Modal>
		</div>
	);
};

ProductSpecification.propTypes = {
	data: PropTypes.array.isRequired,
	handler: PropTypes.func.isRequired,
	info: PropTypes.func.isRequired,
};

export default ProductSpecification;
