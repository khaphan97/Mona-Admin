import React from "react";

function TopMarketplace(props) {
	return (
		<div className="col-xl-4">
			<div className="card">
				<div className="card-body">
					<h4 className="header-title">Top Marketplaces</h4>
					<canvas id="doughnut" height={350} className="mt-4" />
				</div>
			</div>
		</div>
	);
}

export default TopMarketplace;
