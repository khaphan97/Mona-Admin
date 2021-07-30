import OrdersApi from "api/ordersApi";
import { useEffect, useState } from "react";

const useOrdersDetail = () => {
	const [orderDetails, setOrderDetails] = useState({
		totalOrders: 0,
		totalPrice: 0,
		customerInfo: [],
	});

	useEffect(() => {
		const getListOrders = async () => {
			const res = await OrdersApi.getListOrders();
			if (res) {
				console.log(res);
				const { data } = res;
				const totalOrders = data.length;
				const totalPrice = data.reduce((total, order) => {
					return total + +order.total_price;
				}, 0);
				const customerInfo = data.map((order) => {
					return {
						id: order.id,
						fullname: order.full_name,
						address: order.address,
						phone: order.phone,
						email: order.email,
					};
				});

				setOrderDetails({ totalOrders, totalPrice, customerInfo });
			}
		};
		getListOrders();
	}, []);

	return orderDetails;
};

export default useOrdersDetail;
