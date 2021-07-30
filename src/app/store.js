import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import ordersReducer from "./orders-slice";
export const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		products: productsReducer,
		orders: ordersReducer,
	},
});
