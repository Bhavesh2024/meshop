import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Modal from "../../components/modal/Modal";

// Async action for adding a product to the cart
export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ productId, username }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/users/${username}/cart/${productId}`,
				{
					username,
					product_id: productId,
				}
			);
			if (response.status === 200) {
				return { productId, username };
			}
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for deleting a product from the cart
export const deleteFromCart = createAsyncThunk(
	"cart/deleteFromCart",
	async ({ productId, username }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`http://localhost:5000/api/users/${username}/cart/${productId}`
			);
			if (response.status === 200) {
				return { productId, username };
			}
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for initializing user cart data
export const initUserCartData = createAsyncThunk(
	"cart/initUserCartData",
	async ({ username }, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/users/${username}/cart`
			);
			return response.data; // Expected format: { username: "bhavesh_1724", cart: ["MSE004"] }
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const cartSlice = createSlice({
	name: "cart",
	initialState: {}, // Initial state as an object to accommodate the API response structure
	reducers: {
		// Any synchronous reducers can be added here if needed
	},
	extraReducers: (builder) => {
		builder
			// Handle addToCart
			.addCase(addToCart.fulfilled, (state, action) => {
				const { productId, username } = action.payload;
				if (!state[username]) {
					state[username] = { cart: [] };
				}
				state[username].cart.push(productId);
			})
			.addCase(addToCart.rejected, (state, action) => {
				console.log("Failed to add product to cart:", action.payload);
			})
			// Handle deleteFromCart
			.addCase(deleteFromCart.fulfilled, (state, action) => {
				const { productId, username } = action.payload;
				if (state[username] && state[username].cart) {
					state[username].cart = state[username].cart.filter(
						(id) => id !== productId
					);
				}
			})
			.addCase(deleteFromCart.rejected, (state, action) => {
				console.log(
					"Failed to delete product from cart:",
					action.payload
				);
			})
			// Handle initUserCartData
			.addCase(initUserCartData.fulfilled, (state, action) => {
				const { username, cart } = action.payload;
				state[username] = { cart };
			})
			.addCase(initUserCartData.rejected, (state, action) => {
				console.log("Failed to initialize cart data:", action.payload);
			})
			.addCase(initUserCartData.pending, (state) => {
				// Optional: Add a loading state if needed
			});
	},
});

export default cartSlice.reducer;
