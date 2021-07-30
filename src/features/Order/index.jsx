import { Button, Table, Tag } from "antd";
import { getListOrdersAsync } from "app/orders-slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCartTable from "./components/ListCartTable";

const columns = [
	{ title: "Mã đơn hàng", dataIndex: "order_code", key: "fullname" , render : (order_code) => {
		return <span>#{order_code.toUpperCase()}</span>
	}},
	{ title: "Họ và tên", dataIndex: "full_name", key: "fullname" },
	{ title: "Địa chỉ", dataIndex: "address", key: "address" },
	{ title: "Số Điện thoại", dataIndex: "phone", key: "phone" },
	{ title: "Email", dataIndex: "email", key: "email" },
	// {
	// 	title: "Trạng thái",
	// 	dataIndex: "status",
	// 	key: "status",
	// 	render: (status, index) => {
	// 		let color = +status === 0 ? "red" : "green";
	// 		let newStatus = +status === 0 ? "Chưa xác nhận" : "Đã hoàn thành";
	// 		return (
	// 			<Tag color={color} key={++status}>
	// 				{newStatus.toUpperCase()}
	// 			</Tag>
	// 		);
	// 	},
	// },
	// {
	// 	title: "Hành động",
	// 	dataIndex: "",
	// 	key: "x",
	// 	render: () => <Button type="primary">Xác nhận </Button>,
	// },
];

function Orders(props) {
	const listOrders = useSelector((state) => state.orders.listOrders) || [];

	const dispatch = useDispatch();

	React.useEffect(() => {
		const getListCarts = () => {
			dispatch(getListOrdersAsync());
		};
		getListCarts();
	}, [dispatch]);

	return (
		<div className="p-4">
			<h3>Danh sách đơn hàng</h3>
			<Table
				columns={columns}
				expandable={{
					expandedRowRender: (record) => {
						return <ListCartTable listCart={record.list_cart_item} />;
					},
				}}
				dataSource={listOrders}
			/>
		</div>
	);
}

export default Orders;
