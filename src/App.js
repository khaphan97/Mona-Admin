import { Layout } from "antd";
import { getBrandAsync, getCateAsync } from "app/categoriesSlice";
import "assets/css/_base.scss";
import HeaderComponent from "components/Header";
import SideBar from "components/SideBar";
import Brands from "features/Brands";
import Categories from "features/Categories";
import Home from "features/Home";
import Order from "features/Order";
import Products from "features/Products";
import React from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	const { Sider, Header, Content } = Layout;

	const dispatch = useDispatch();

	React.useEffect(() => {
		const getListCate = () => {
			dispatch(getCateAsync());
		};
		getListCate();
	}, [dispatch]);

	React.useEffect(() => {
		const getListBrands = () => {
			dispatch(getBrandAsync());
		};
		getListBrands();
	}, [dispatch]);

	return (
		<div className="App">
			<Router>
				<Layout>
					<Header>
						<HeaderComponent />
					</Header>
					<Layout>
						<Sider>
							<SideBar />
						</Sider>
						<Content className="">
							<Switch>
								<Route path="/" exact>
									<Home />
								</Route>
								<Route path="/product">
									<Products />
								</Route>
								<Route path="/categories">
									<Categories />
								</Route>
								<Route path="/brands">
									<Brands />
								</Route>
								<Route path="/orders">
									<Order />
								</Route>
							</Switch>
						</Content>
					</Layout>
				</Layout>
			</Router>
			<footer className="text-center py-3" style={{ height: "80px", background: "#001529" }}>
				<p className="text-white" style={{ verticalAlign: "middle" }}>
					Copyright 2020-2022 by Mona Media
				</p>
			</footer>
		</div>
	);
}

export default App;
