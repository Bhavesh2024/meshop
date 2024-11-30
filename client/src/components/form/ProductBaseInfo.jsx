import React, { useContext, useEffect, useRef, useState } from "react";
import { headphone, smartPhone, smartTv } from "./productDefault";
import { ProductContext } from "../../context/ProductContext";

const ProductBaseInfo = ({
	data,
	handler,
	specification,
	refs,
	submitHandler,
	form,
}) => {
	const {image, setImage} = useContext(ProductContext);
	const [isValid,setIsValid] = useState(false)
	const fileRef = useRef(0);
	const submitRef = useRef(0);
  
	const handleInput = (e) => {
		const { name, value } = e.target;
		// if (form == "update") {
		// 	setPrice(parseInt(value));
		// 	setDiscount(parseInt(value));
		// }
		validateField(name,value);
		handler({ ...data, [name]: value });
	};

	const handleUploadFile = (e) => {
		fileRef.current.click();
	};

	const handleFileChange = (e) => {
		const files = e.target.files[0];

		console.log("files" + files);
		if (files) {
			const reader = new FileReader();
			console.log(reader);
			reader.onloadend = () => {
				console.log(reader.result);
				setImage(reader.result); // Set the image source when file is loaded
				console.log(fileRef.current.value);
				handler({ ...data, image: files });
			};
			reader.readAsDataURL(files); // Convert the file to a base64 URL
		}
	};
	const finalPrice = () => {
		if (data.price != "" && data.discount != "") {
			const price = data.price;
			const discount = data.discount;

			// handler({...data,final_price:parseInt(price - price * (discount / 100))})
			return parseInt(price - price * (discount / 100));
		}
		return 0;
	};

	const [validateInput, setValidateInput] = useState([
		{
			product_id: {
				pattern: /^MSE\d{3}$/,
				message: 'Product ID must start with "MSE" followed by exactly three digits (e.g., MSE001).',
				status: true,
			},
		},
		{
			product_name: {
				pattern: /^[A-Za-z0-9\s,.'-]{1,100}$/,
				message: 'Product name can contain letters, numbers, spaces, commas, periods, and dashes.',
				status: true,
			},
		},
		{
			brand: {
				pattern: /^[A-Za-z\s]{1,100}$/,
				message: 'Brand name can contain only letters and spaces.',
				status: true,
			},
		},
		{
			warranty: {
				pattern: /^[1-9]\d*\s(years?|months?|days?|hours?)$/,
				message: 'Warranty must start with a number followed by "year(s)", "month(s)", "day(s)", or "hour(s)" (e.g., 1 year, 6 months).',
				status: true,
			},
		},
	]);
	

	const validateField = (field, value) => {
		const updatedValidation = validateInput.map((item) => {
				if (item[field]) {
						return {
								...item,
								[field]: {
										...item[field],
										status: item[field].pattern.test(value),
								},
						};
				}
				return item;
		});
	
		setValidateInput(updatedValidation);
	};

	useEffect(() => {
		console.log(data.category);
		if (data.category != "") {
			refs.current.disabled = false;
			switch (data.category) {
				case "smartphone":
					return form !== "update"
						? specification(data.detailed_specifications.length == 0 ? smartPhone : data.detailed_specifications)
						: specification(data.detailed_specifications);
				case "smartTv":
					return form !== "update"
						? specification(data.detailed_specifications.length == 0 ? smartTv : data.detailed_specifications)
						
						: specification(data.detailed_specifications);
				case "headphone":
					return form !== "update"
					? specification(data.detailed_specifications.length == 0 ? headphone : data.detailed_specifications)
						: specification(data.detailed_specifications);
			}
		} else {
			refs.current.disabled = true;
		}
	}, [data]);

	useEffect(() => {
		console.log(image);
	}, [image]);

	// useEffect(() => {
	// 	if (form == "update") {
	// 		// data.price.slice(1, data.price.length - 1);
	// 		// data.discount.split("%");
	// 		setPrice(data.price.slice(1, data.price.length - 1));
	// 		setDiscount(data.discount.split("%"));
	// 	}
	// }, []);
	useEffect(() =>{
    const anyInvalid = validateInput.some(inputObj => {
      const key = Object.keys(inputObj)[0];
      return !inputObj[key].status;
    });
  
    setIsValid(!anyInvalid); 
  },[validateInput])

  useEffect(()=>{
     !isValid ? submitRef.current.disabled = true : submitRef.current.disabled=false;
  },[isValid])

	return (
		<>
			<form
				// action=""
				className="w-full p-4 flex flex-col gap-3 h-4/5"
				onSubmit={submitHandler}
			>
				<div
					className="text-center border rounded-md p-3"
					onClick={handleUploadFile}
				>
					{image || form == "update" ? (
						<img
							src={
								form == "update"
									? image == ""
										? data.image
										: image
									: image
							}
							className="flex m-auto"
						></img>
					) : (
						<i class="fa-solid fa-upload text-8xl text-indigo-200 text-center"></i>
					)}
					<p className="text-sm my-2 text-gray-400">
						Upload Product Image
					</p>
					<input
						type="file"
						name="image"
						id="image"
						ref={fileRef}
						hidden={true}
						onChange={handleFileChange}
						// required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<input
						type="text"
						id="product_id"
						name="product_id"
						placeholder="Product Id"
						value={data.product_id}
						className={`border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400 ${validateInput[0].product_id.status ? '' : 'border-red-500'}`}
						onChange={handleInput}
						disabled={form == "update"}
						required
					/>
					<div className="text-xs text-red-500">
						 {!validateInput[0].product_id.status ? validateInput[0].product_id.message : '' }
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<input
						type="text"
						id="product_name"
						name="product_name"
						placeholder="Product Name"
						value={data.product_name}
						className={`border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400 ${validateInput[1].product_name.status? '' : 'border-red-500'}`}
						onChange={handleInput}
						required
					/>
										<div className="text-xs text-red-500">
						 {!validateInput[1].product_name.status ? validateInput[1].product_name.message : '' }
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<input
						type="text"
						id="brand"
						name="brand"
						placeholder="Brand"
						value={data.brand}
						className={`border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400 ${validateInput[2].brand.status? '' : 'border-red-500'}`}
						onChange={handleInput}
						required
					/>
					<div className="text-xs text-red-500">{!validateInput[2].brand.status ? validateInput[2].brand.message :''}</div>
				</div>
				<div>
					<select
						className={`border w-full p-3 rounded-md ${
							!data.category ? "text-slate-400" : "text-gray-600"
						} `}
						name="category"
						onChange={handleInput}
						value={data.category}
						required
					>
						<option
							name="category"
							value=""
							selected
							disabled
							className="text-gray-300"
						>
							Select Category
						</option>
						<option value="smartphone">Smartphone</option>
						<option value="smartTv">Smart TV</option>
						<option value="headphone">Headphone</option>
					</select>
				</div>
				<div>
					<input
						type="number"
						id="price"
						name="price"
						min={0}
						placeholder="Price"
						value={data.price}
						className="border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400"
						onChange={handleInput}
						required
					/>
				</div>

				<div>
					<input
						type="number"
						id="discount"
						name="discount"
						min={0}
						max={100}
						placeholder="Discount"
						value={data.discount}
						className="border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400"
						onChange={handleInput}
						required
					/>
				</div>

				<div>
					<input
						type="number"
						id="final_price"
						name="final_price"
						placeholder="Sale Price"
						// min={100}
						value={
							finalPrice()
						}
						className="border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400"
						onChange={handleInput}
						required
						readOnly
					/>
				</div>
				<div>
					<select
						className={`border w-full p-3 rounded-md ${
							!data.stock_status
								? "text-slate-400"
								: "text-gray-600"
						} `}
						name="stock_status"
						onChange={handleInput}
						value={data.stock_status}
						required
					>
						<option value="" selected disabled>
							Stock Status
						</option>
						<option name="stock_status" value="In Stock" selected>
							In Stock
						</option>
						<option name="stock_status" value="Out of Stock">
							Out of Stock
						</option>
					</select>
				</div>
				<div className="flex flex-col gap-1">
					<input
						type="text"
						id="warranty"
						name="warranty"
						placeholder="Warranty"
						value={data.warranty}
						className={`border w-full p-3 rounded-md text-gray-600 placeholder:text-slate-400 ${validateInput[3].warranty.status? '' : 'border-red-500'}`}
						onChange={handleInput}
						required
					/>
					<div className="text-xs text-red-500">
								{!validateInput[3].warranty.status ? validateInput[3].warranty.message : ''}
					</div>
				</div>
				
				<div>
					<textarea
						name="description"
						id="description"
						className="w-full border p-2"
						rows={4}
						minLength={100}
						value={data.description}
						placeholder="Write description..."
						onChange={handleInput}
					></textarea>
				</div>
				<div>
					<button
						type="submit"
						className="text-sm bg-slate-900 text-white p-3 rounded-md px-6 flex mx-auto disabled:bg-gray-200 "
						name="submit"
						ref={submitRef}
					>
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default ProductBaseInfo;
