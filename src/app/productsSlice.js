import { message } from "antd";
import ProductAPI from "api/productsAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getProductsAsync = createAsyncThunk("product", async () => {
	const result = await ProductAPI.getListProducts();
	return result;
});

export const deleteProductAsync = createAsyncThunk("product/delete", async (id) => {
	const result = await ProductAPI.deleteProduct(id);
	return result;
});

const productsSlice = createSlice({
	name: "products",
	initialState: {
		listProduct: [],
		isLoading: false,
	},
	reducer: {},
	extraReducers: {
		[getProductsAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getProductsAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.listProduct = action.payload.data;
		},
		[deleteProductAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteProductAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			if (action.payload.status) {
				const newListProduct = state.listProduct.filter((product) => {
					return +product.product_id !== action.payload.productId;
				});
				state.listProduct = newListProduct;
				message.success(action.payload.message);
			} else {
				message.error(action.payload.message);
			}
		},
	},
});

export default productsSlice.reducer;
