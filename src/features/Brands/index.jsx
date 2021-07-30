import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BrandsForm from "./components/BrandsForm";
import BrandsTable from "./components/BrandsTable";

function Brands(props) {

	const { path } = useRouteMatch();
	
	return (
		<div className="p-4">
		<Switch>
			<Route path={path} exact>
				<BrandsTable />
			</Route>
			<Route path={`${path}/add`} exact>
				<BrandsForm  />
			</Route>
			<Route path={`${path}/update/:id`} exact>
				<BrandsForm  />
			</Route>
		</Switch>
	</div>
	);
}

export default Brands;
