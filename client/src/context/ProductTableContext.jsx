import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ProductTableContext = createContext(0);
const ProductTableContextProvider = ({ children }) => {
	const [productTableData, setProductTableData] = useState({});
	const [slicedRowData, setSlicedRowData] = useState([]);
	const fetchProducts = async (category = "All") => {
		const url = `https://meshop-hx32.onrender.com/api/products/${
			category != "All" ? `category/${category}` : ""
		}`;
		console.log("url : " + url);
		try {
			const response = await axios.get(url);
			if (response.status == 200) {
				const data = response.data;
				setProductTableData(data);
				setSlicedRowData([]);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const createPagination = (data, rows) => {
		const isObject = Array.isArray(data);
		let totalDataLength = 0;
		let dividedDataArr = [];
		console.log(isObject);
		if (!isObject) {
			// console.log(Object.values(data));
			const dataArr = Object.values(data);
			let totalDataLength = 0;
			const dividedDataArr = [];
			dataArr.map((value, index) => {
				totalDataLength = totalDataLength + value.length;
			});
			if (totalDataLength > 5) {
				const remainingLength = totalDataLength % rows;
				dataArr.forEach((value, index) => {
					let minIndex = 0,
						maxIndex = rows;
					value.map((data, index) => {
						if (minIndex == index) {
							// console.log("data : ");
							if (dividedDataArr.length != 0) {
								dividedDataArr.map((arr) => {
									if (
										arr.length < rows &&
										arr.length != rows
									) {
										let currentIndex = index;
										while (arr.length != rows) {
											arr.push(value[currentIndex]);
											currentIndex += 1;
										}
										minIndex = currentIndex;
										maxIndex = rows + minIndex;
										// while (arr.length < rows) {
										// 	// arr.push(minIndex,arr.length);
										// 	// arr.push(value.slice(index));
										// 	// index = index + 1;
										// 	// minIndex = minIndex + 1;
										// }
									}
								});
							}

							dividedDataArr.push(
								value.slice(minIndex, maxIndex)
							);
							// pagination.push(dividedDataArr.length);
							minIndex = maxIndex;
							maxIndex =
								minIndex < value.length
									? minIndex + rows
									: minIndex + (value.length % rows);
						}
					});
					setSlicedRowData(dividedDataArr);
					// setPagination(pagination.push(dividedDataArr.length));
				});
			} else {
				// setPagination([]);
			}
		} else {
			totalDataLength = data.length;
			console.log("hello" + data.length);
			console.log("length " + totalDataLength);
			if (totalDataLength > 3) {
				let minIndex = 0,
					maxIndex = rows;
				data.map((value, index) => {
					// console.log(value)
					if (minIndex == index) {
						console.log(minIndex);
						console.log(maxIndex);
						if (dividedDataArr.length !== 0) {
							dividedDataArr.map((arr) => {
								console.log("hello page");
								if (arr.length < rows && arr.length != rows) {
									let currentIndex = index;
									console.log("my index " + currentIndex);
									while (arr.length != rows) {
										arr.push(data[currentIndex]);
										currentIndex += 1;
									}
									minIndex = currentIndex;
									maxIndex = rows + minIndex;
								}
							});
						}
						dividedDataArr.push(data.slice(minIndex, maxIndex));
						minIndex = maxIndex;
						maxIndex = minIndex + rows;
						console.log(maxIndex);
					}
				});
				console.log(dividedDataArr);
				setSlicedRowData(dividedDataArr);
			}
		}

		// console.log(slicedRowData);
	};

	// useEffect(() =>{
	// 	createPagination(productTableData,5);

	// },[slicedRowData])
	return (
		<ProductTableContext.Provider
			value={{
				productTableData,
				setProductTableData,
				fetchProducts,
				createPagination,
				slicedRowData,
			}}
		>
			{children}
		</ProductTableContext.Provider>
	);
};

export default ProductTableContextProvider;
