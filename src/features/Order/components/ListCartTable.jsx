import { Table } from "antd";
import Currency from "Helper/currency";
import React from "react";
import styles from "./ListCartTable.module.css";
import "./ListCartTable.css";

const { Column } = Table;

function ListCartTable(props) {
	let { listCart } = props;
	let newlistCart = JSON.parse(listCart);
	listCart = newlistCart.map((cartItem) => {
		cartItem.key = cartItem.id;
		return cartItem;
	});
	return (
		<Table dataSource={listCart} pagination={false} className={styles.ant_table}>
			<Column
				title="Hình Ảnh"
				dataIndex="product_img"
				key="product_img"
				render={(product_img) => {
					return <img width="50" src={product_img} alt="sanpham" />;
				}}
			/>
			<Column title="Tên sản phẩm" dataIndex="product_name" key="product_name" />
			<Column
				title="Giá"
				dataIndex="product_price"
				key="product_price"
				render={(product_price) => {
					return <span>{Currency.format(product_price)}</span>;
				}}
			/>
			<Column title="Số lượng" dataIndex="quantity" key="quantity" />
		</Table>
	);
}

export default ListCartTable;
