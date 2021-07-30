import React from "react";
import { XYPlot, VerticalBarSeries, ChartLabel } from "react-vis";

function SaleAnalytics(props) {
	const data = [
		{ x: 0, y: 1 },
		{ x: 1, y: 2 },
		{ x: 2, y: 3 },
		{ x: 3, y: 4 },
		{ x: 4, y: 5 },
		{ x: 5, y: 6 },
		{ x: 6, y: 7 },
		{ x: 7, y: 8 },
		{ x: 8, y: 9 },
		{ x: 9, y: 10 },
		{ x: 10, y: 11 },
		{ x: 11, y: 12 },
	];
	return (
		<div className="col-xl-8">
			<div className="card">
				<div className="card-body">
					<h4 className="header-title">Phân tích bán hàng</h4>
					<XYPlot height={400} width={750}>
						<ChartLabel
							text="Doanh Thu"
							className="alt-y-label"
							includeMargin={false}
							xPercent={0.06}
							yPercent={0.06}
							style={{
								transform: "rotate(-90)",
								textAnchor: "end",
							}}
						/>
						<VerticalBarSeries data={data} />
					</XYPlot>
				</div>
			</div>
		</div>
	);
}

export default SaleAnalytics;
