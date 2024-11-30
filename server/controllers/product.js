const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Fuse = require("fuse.js");
const getAllProductData = () => {
	const result = fs.readFileSync("./data/product.json");
	const products = JSON.parse(result);
	return products;
};
const getAllProduct = async (req, res) => {
	const result = fs.readFileSync("./data/product.json");
	const products = JSON.parse(result);
	if (products) {
		return res.status(200).json(products);
	}
	return res.status(404).json("No Product Found");
};

const getProductFromCategory = async (req, res) => {
	const category = req.params.category;
	console.log(category);
	const result = fs.readFileSync("./data/product.json");
	const products = JSON.parse(result);
	if (products) {
		categoryProducts = Object.entries(products).filter(
			([key, value]) => key == category
		);
		return res.status(200).json(categoryProducts[0][1]);
	}
	return res.status(404).json("No Product Found");
};

const getProductFromId = async (req, res) => {
	const id = req.params.productId;
	console.log(id);
	const result = fs.readFileSync("./data/product.json");
	const products = JSON.parse(result);
	if (products) {
		product = Object.entries(products)
			.map(([key, value]) => {
				const matchedProducts = value.filter(
					(product) => product.product_id === id
				);

				if (matchedProducts.length > 0) {
					return [key, matchedProducts];
				}

				return null;
			})
			.filter((item) => item !== null);
		console.log(product);
		if (product.length > 0) {
			return res.status(200).json(product[0][1][0]);
		}
	}
	return res.status(404).json("No Product Found");
};

const addProduct = async (req, res) => {
	const productData = req.body; // Product data excluding the file
	const { price, discount } = productData;
	productData.final_price = `${price - (price * discount) / 100}`;
	productData.price = `${price}`;
	productData.discount = `${discount}`;
  let isExistProductId = false;
	let productCategory = '';
	console.log(productData);
	// console.log(productData.detailed_specifications);
	// console.log(JSON.stringify(productData));
	const products = getAllProductData();
  
	// console.log(products);
	if (products !== null && products !== undefined) {
		// console.log("hello");
		const newProduct = Object.entries(products).forEach(([key, value]) => {
			// console.log(value.includes(productData.product_id));
			value.map((data,index) =>{
				if( data.product_id == productData.product_id){
					isExistProductId = true;	
					
				}
			})
			if (value[0].category == productData.category) {
				// value.push(productData);
				productCategory = `${productData.category.toLowerCase()}s`
			}
			return value;
		});
		//  console.log(newProduct[1][0].category);
		if(isExistProductId){

			return res
							.status(405)
							.json({ message: "Product Id Already Exist" });
		}else{
			Object.entries(products[productCategory]).push(productData);
		}
		const newProductData = Object.fromEntries(
			newProduct.map((data) => [data[1].category + "s", data])
		);
		//  console.log(newProductData.headphones);
		fs.writeFileSync("./data/product.json", JSON.stringify(newProductData));
		return res.status(200).json({ message: "Product Added Successfully" });
	}
	return res.status(400).json({ message: "No Products Found" });
};

const uploadProductImage = async (req, res) => {
	console.log(req.body.image);
	// const categoryString = `http://localhost:5000/api/products/images/${req.body.category}/`
	const image = req.body.image.slice(req.body.image.lastIndexOf("/"));
	console.log();
	const isExist = fs.existsSync(
		`./images/products/${
			req.body.category !== "headphone"
				? req.body.category
				: `${req.body.category}s`
		}${image}`
	);
	console.log(isExist);
	if (isExist) {
		return res.status(200).json({ image: req.body.image });
	}
	return res.status(400).json({ message: "Image Not Uploaded" });
};

const updateProduct = async (req, res) => {
	const productData = req.body;
	const products = getAllProductData();

	// Iterate through categories and products, updating the matching product by ID
	const newData = Object.entries(products).map(([key, value]) => {
		const updatedProducts = value.map((data) => {
			if (data.product_id === productData.product_id) {
				return { ...data, ...productData }; // Merge updated fields with existing data
			}
			return data; // Keep the original data if there's no match
		});
		return [key, updatedProducts]; // Return updated key-value pair
	});

	// Convert updated data back to an object
	const updatedData = Object.fromEntries(newData);

	if (updatedData) {
		try {
			// Write updated data to file
			fs.writeFileSync(
				"./data/product.json",
				JSON.stringify(updatedData, null, 2)
			);
			console.log("Product data successfully updated.");
			return res
				.status(200)
				.json({ message: "Product updated successfully" });
		} catch (error) {
			console.error("Error writing updated data:", error);
			return res.status(500).json({ message: "Error updating product" });
		}
	} else {
		return res.status(400).json({ message: "Product Not Updated" });
	}
};
const deleteProduct = async (req, res) => {
	console.log(req.params.productId);
	const productId = req.params.productId;

	if (productId == "" || productId == undefined) {
		return res.status(404).json({ message: "Product Not Found" });
	}
	const products = getAllProductData();

	const filteredData = Object.entries(products).map(([key, value]) => {
		return value.filter((value) => value.product_id !== productId);
		// return value;
	});

	// console.log(filteredData);
	const updatedData = Object.fromEntries(
		filteredData.map((product) => [product[0].category + "s", product])
	);
	// console.log(updateData)
	if (updatedData !== products) {
		fs.writeFileSync("./data/product.json", JSON.stringify(updatedData));
		return res
			.status(200)
			.json({ message: "product deleted Successfully" });
	}

	return res.status(400).json({ message: "Product Not Deleted" });
};

// const Fuse = require('fuse.js');

const searchProduct = async (req, res) => {
	const { searchValue } = req.params;
	const products = getAllProductData(); // Assuming this returns an array of all products.

	const options = {
		keys: ["product_name", "product_id"],
		threshold: 0.5, // Adjust for more or less fuzziness.
		includeScore: true,
	};

	const result = [];

	// Iterate through the products and look for matches.
	Object.entries(products).forEach(([key, value]) => {
		const fuse = new Fuse(value, options);
		value.map((value) => {
			if (result.length !== 5) {
				// console.log(value.product_name)
				if (value.product_name.toLowerCase().match(searchValue)) {
					console.log(value.product_name);
					result.push(value.product_id);
					console.log(result);
				} else {
					const searchResult = fuse.search(searchValue);
					searchResult.map((value) => {
						if (result.length !== 5) {
							result.push(value.item.product_id);
						}
					});
				}
			}
		});
	});

	console.log(result);
	if (result.length !== 0) {
		return res.status(200).json({ result: result });
	} else {
		return res.status(404).json({ message: "Not Found" });
	}
};

module.exports = {
	getAllProductData,
	getAllProduct,
	getProductFromCategory,
	getProductFromId,
	addProduct,
	updateProduct,
	deleteProduct,
	uploadProductImage,
	searchProduct,
};
