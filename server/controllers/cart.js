const fs = require("fs");
const { getAllProductData } = require("./product");
const getCartData = () => {
	const result = fs.readFileSync("./data/cart.json");
	if (result !== null) {
		return JSON.parse(result);
	}
};
const addToCart = async (req, res) => {
	const { username, product_id } = req.body;
	console.log(req.body);
	console.log("cart requested");
	const cartData = getCartData();

	const newData = Object.entries(cartData).map(([key, value]) => {
		if (key == username) {
			if (value.cart) {
				value.cart.push(product_id);
			}
		}

		return value;
	});
	// const newData = {...cartData,[username]:{}}
	console.log(newData);

	const updatedCartData = Object.fromEntries(
		newData.map((u) => [u.username, u])
	);
	console.log(updatedCartData);
	fs.writeFileSync("./data/cart.json", JSON.stringify(updatedCartData));
	res.status(200).send("product added");
};

const removeFromCart = async (req, res) => {
	const { username, productId } = req.params;

	console.log(username, productId);
	const cart = getCartData();
	let user = {};
	const filteredData = Object.values(cart).filter((value) => {
		if (username == value.username) {
			value.cart = value.cart.filter((value) => value !== productId);
			console.log(value.cart);
			user = value;
		}
		return value;
	});

	console.log(filteredData);
	const deletedData = Object.fromEntries(
		filteredData.map((u) => [u.username, u])
	);
	console.log(deletedData);
	fs.writeFileSync("./data/cart.json", JSON.stringify(deletedData));
	res.status(200).json({
		message: "Product Deleleted Successfully",
		data: user,
	});
};

const getUserCart = async (req, res) => {
	const username = req.params.username;

	const cart = getCartData();

	if (!Object.keys(cart).includes(username))
		return res.status(404).json({ message: "User Not Found" });
	Object.entries(cart).map(([key, value]) => {
		if (key == username) {
			return res.status(200).json(value);
		}
	});
};

const getCartDetail = async (req, res) => {
	const { username } = req.params;
	const data = req.body;
	console.log("cart data");
	console.log(username);
	console.log(data);

	const products = getAllProductData();

	const priceContainer = [];
	const discountContainer = [];
	Object.entries(products).map(([key, value]) => {
		//   console.log(value.includes(data.cart[0]));
		value.map((value) => {
			if (data.cart.includes(value.product_id)) {
				// console.log('hello')
				const price = convertToNum(value.price);
				const discount = convertToNum(value.discount);
				console.log("price :" + price);
				console.log("discount : ", +discount);
				priceContainer.push(price);
				discountContainer.push(discount);
			}
		});
	});
	let priceAmount = 0;
	let discountAmount = 0;
	priceContainer.map((value, index) => {
		priceAmount = priceAmount + value;
		discountAmount =
			discountAmount + parseInt((value * discountContainer[index]) / 100);
	});

	console.log(
		"price Amount :  " +
			priceAmount +
			"\n" +
			"Discount Amount : " +
			discountAmount
	);
	// console.log('total price : ')
	const cartData = {
		price: priceAmount,
		discount: discountAmount,
		totalPrice: priceAmount - discountAmount,
	};
	return res.status(200).json({ detail: cartData });
};

const convertToNum = (value) => {
	return parseInt(value);
};
module.exports = {
	addToCart,
	removeFromCart,
	getUserCart,
	getCartData,
	getCartDetail,
};
