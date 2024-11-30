const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const dir = require('di')
const router = express.Router();
const {
	getAllUser,
	getUser,
	deleteUser,
	updateUser,
	logoutUser,
} = require("../controllers/user");
const {
	getAllProduct,
	getProductFromCategory,
	getProductFromId,
	addProduct,
	updateProduct,
	deleteProduct,
	uploadProductImage,
	searchProduct,
} = require("../controllers/product");
const {
	addToCart,
	removeFromCart,
	getUserCart,
	getCartDetail,
} = require("../controllers/cart");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = path.join(
			__dirname,
			`../images/products/${
				req.body.category === "headphone"
					? req.body.category + "s"
					: req.body.category
			}`
		);
		console.log(req.body);

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}
		cb(null, uploadDir); // Save uploaded files in the respective category folder
	},
	filename: (req, file, cb) => {
		const fileExtension = path.extname(file.originalname); // Extract the file extension
		const baseName = path.basename(file.originalname, fileExtension); // Extract file name without extension
		console.log(req.body.category);
		const uploadDir = path.join(
			__dirname,
			`../images/products/${
				req.body.category === "headphone"
					? req.body.category + "s"
					: req.body.category
			}`
		);

		// Generate a unique filename if a file with the same name exists
		let finalFileName = file.originalname;
		let fileIndex = 1;
		while (fs.existsSync(path.join(uploadDir, finalFileName))) {
			finalFileName = `${baseName}-${fileIndex}${fileExtension}`; // Append a counter
			fileIndex += 1;
		}
		req.body.image = `https://meshop-r6ed.onrender.com/products/images/${
			req.body.category === "headphone"
				? req.body.category + "s"
				: req.body.category
		}/${finalFileName}`;

		cb(null, finalFileName); // Use the unique filename
	},
});

const upload = multer({ storage: storage });

// User Data API Route
router.get("/users", getAllUser);
router.get("/users/:username", getUser);
router.post("/users/logout", logoutUser);

// User Operation API Route
router.delete("/users/:username", deleteUser);
router.put("/users/:username", updateUser);

// Product Data API
router.get("/products", getAllProduct);
router.get("/products/category/:category", getProductFromCategory);
router.get("/products/id/:productId", getProductFromId);

// Product Operation API
router.post("/products/uploads/", upload.single("image"), uploadProductImage);
router.post("/products", addProduct);
router.put("/products", updateProduct);
router.delete("/products/:productId", deleteProduct);

// Product Cart API
router.get("/users/:username/cart", getUserCart);
router.post("/users/:username/cart/:productId", addToCart);
router.delete("/users/:username/cart/:productId", removeFromCart);
router.post("/user/:username/cart/detail", getCartDetail);

router.get("/products/search/:searchValue", searchProduct);

module.exports = router;
