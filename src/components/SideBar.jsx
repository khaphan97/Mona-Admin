import {
	ContainerOutlined,
	DesktopOutlined,
	AppstoreOutlined,
	ShoppingCartOutlined,
	DashboardOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar(props) {
	return (
		<div style={{ width: "100%" }}>
			<Menu
				defaultSelectedKeys="home"
				mode="inline"
				theme="dark"
			>
				<Menu.Item key="home" icon={<DashboardOutlined />}>
					<Link to="/">Trang Chủ</Link>
				</Menu.Item>
				<Menu.Item key="product" icon={<AppstoreOutlined />}>
					<Link to="/product">Sản Phẩm</Link>
				</Menu.Item>
				<Menu.Item key="categories" icon={<DesktopOutlined />}>
					<Link to="/categories">Danh Mục</Link>
				</Menu.Item>
				<Menu.Item key="brands" icon={<ContainerOutlined />}>
					<Link to="/brands">Thương Hiệu</Link>
				</Menu.Item>
				<Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
					<Link to="/orders">Đơn hàng</Link>
				</Menu.Item>
				{/* <Menu.Item key="4" icon={<ContainerOutlined />}>
					<Link to="/order">Order</Link>
				</Menu.Item> */}
			</Menu>
		</div>
	);
}

export default SideBar;
