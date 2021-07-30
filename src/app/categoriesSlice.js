import { message } from "antd";
import CategoriesAPI from "api/categoriesAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getCateAsync = createAsyncThunk("category", async () => {
	const result = await CategoriesAPI.getListCategories();
	return result;
});

export const addCateAsync = createAsyncThunk("category/add", async (data) => {
	const result = await CategoriesAPI.addNewCate(data);
	return result;
});

export const deleteCateAsync = createAsyncThunk("category/delete", async (id) => {
	const result = await CategoriesAPI.deleteCate(id);
	return result;
});

export const updateCateAsync = createAsyncThunk("category/update", async (data) => {
	const result = await CategoriesAPI.updateCate(data);
	return result;
});

export const getBrandAsync = createAsyncThunk("category/brand", async () => {
	const result = await CategoriesAPI.getListBrands();
	return result;
});

export const addBrandAsync = createAsyncThunk("category/brand/add", async (data) => {
	const result = await CategoriesAPI.addNewBrand(data);
	return result;
});

export const deleteBrandAsync = createAsyncThunk("category/brand/delete", async (id) => {
	const result = await CategoriesAPI.deleteBrand(id);
	return result;
});

export const updateBrandAsync = createAsyncThunk("category/brand/update", async (data) => {
	const result = await CategoriesAPI.updateBrand(data);
	return result;
});

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		categories: [],
		brands: [],
		isLoading: false,
	},
	reducer: {},
	extraReducers: {
		[getCateAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getCateAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.categories = action.payload.data;
		},
		[getBrandAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getBrandAsync.fulfilled]: (state, action) => {
			state.brands = action.payload.data;
		},
		[addCateAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[addCateAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			const data = action.payload;
			if (data.status === true) {
				state.categories.push(data.newCate);
				message.success(data.message);
			} else {
				message.error(data.data.message);
			}
		},
		[deleteCateAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteCateAsync.fulfilled]: (state, action) => {
			console.log(action);
			state.isLoading = false;
			const res = action.payload;
			if (res.status) {
				message.success(res.message);
				const newListCate = [...state.categories].filter((item) => item.id !== res.cateId);
				console.log(newListCate);
				state.categories = newListCate;
			} else {
				message.error(res.message);
			}
		},
		[updateCateAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateCateAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			const res = action.payload;
			if (res.status) {
				message.success(res.message);
				const listCateUpdate = state.categories.map((category) => {
					if (+category.id === +res.newCate.id) {
						return res.newCate;
					}
					return category;
				});
				state.categories = listCateUpdate;
			}
		},
		[addBrandAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[addBrandAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			const data = action.payload;
			if (data.status === true) {
				state.brands.push(data.newBrand);
				message.success(data.message);
			} else {
				message.error(data.data.message);
			}
		},
		[deleteBrandAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteBrandAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			console.log(action);
			const res = action.payload;
			if (res.status) {
				message.success(res.message);
				const newListBrand = state.brands.filter((item) => item.id !== res.cateId);
				state.brands = newListBrand;
			} else {
				message.error(res.message);
			}
		},
		[updateBrandAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateBrandAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
			const res = action.payload;
			if (res.status) {
				message.success(res.message);
				const listCateUpdate = state.brands.map((category) => {
					if (+category.id === +res.newBrand.id) {
						return res.newBrand;
					}
					return category;
				});
				state.brands = listCateUpdate;
			}
		},
	},
});

export default categoriesSlice.reducer;
