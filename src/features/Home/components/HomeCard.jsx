import React from "react";
import PropTypes from "prop-types";

HomeCard.propTypes = {};

function HomeCard(props) {
	const { title, number, icon } = props;
	console.log(icon);
	return (
		<div className="col-xl-3 col-lg-6">
			<div className="card widget-flat">
				<div className="card-body p-0">
					<div className="p-3 pb-0">
						<div className="float-right">
							<i className={icon} />
						</div>
						<h5 className="text-muted font-weight-normal mt-0">{title}</h5>
						<h3 className="mt-2" >{number}</h3>
					</div>
					<div id="sparkle1" />
				</div>
			</div>
		</div>
	);
}

export default HomeCard;
