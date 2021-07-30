import { message } from "antd";
import OrdersApi from "api/ordersApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getListOrdersAsync = createAsyncThunk("orders", async () => {
	const res = await OrdersApi.getListOrders();
	return res;
});

const ordersSlice = createSlice({
	name: "orders",
	initialState: {
		listOrders: [],
		isLoading: false,
	},
	reducer: {},
	extraReducers: {
		[getListOrdersAsync.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getListOrdersAsync.fulfilled]: (state, action) => {
			state.isLoading = false;
            console.log(action);
			if (action.payload.data) {
				const newListCart = action.payload.data.map(order => {
                    order.key = order.id;
                    return order;
                })
				state.listOrders = newListCart;
			}
		},
	},
});

export default ordersSlice.reducer;
