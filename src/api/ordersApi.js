const { default: axiosInstance } = require("./axiosConfig");

export default class OrdersApi {
	static async getListOrders() {
		const res = await axiosInstance.get("orders");
		if (res.status === 200) {
			return {
				data: res.data,
			};
		}
	}
}
