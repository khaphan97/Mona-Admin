import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

function Categories(props) {
	const { path } = useRouteMatch();

	const [selectedCate, setSelectedCate] = React.useState(null);

	const handleSelectedCate = (cate) => {
		setSelectedCate(cate);
	};

	return (
		<div className="p-4">
			<Switch>
				<Route path={path} exact>
					<CategoryTable onSelectedCate={handleSelectedCate} />
				</Route>
				<Route path={`${path}/add`} exact>
					<CategoryForm selectedCate={selectedCate} />
				</Route>
				<Route path={`${path}/update/:id`} exact>
					<CategoryForm selectedCate={selectedCate} />
				</Route>
			</Switch>
		</div>
	);
}

export default Categories;
