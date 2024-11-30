const express = require("express");
const path = require("path");
const router = express.Router();
// const multer = require('multer');
// Use an environment variable or set a base path
const basePath = path.join(__dirname, "../images/products");

router.get("/:category/:imageFile", (req, res) => {
	const { category, imageFile } = req.params;
	const imagePath = path.join(basePath, category, imageFile);
	
	return res.sendFile(imagePath, (err) => {
		if (err) {
			console.error(err);
			res.status(err.status).end();
		}
	});
});


module.exports = router;
