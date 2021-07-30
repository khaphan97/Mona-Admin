import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route, useRouteMatch } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

function Products(props) {
	
	const { path } = useRouteMatch();
	
	return (
		<div>
			<Switch>
				<Route path={`${path}/`} exact>
					<ProductTable />
				</Route>
				<Route path={`${path}/add`}>
					<ProductForm />
				</Route>
				<Route path={`${path}/update/:id`}>
					<ProductForm />
				</Route>
			</Switch>
		</div>
	);
}
export default Products;
