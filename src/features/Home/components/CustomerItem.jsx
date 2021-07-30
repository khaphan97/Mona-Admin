import React from "react";
import PropTypes from "prop-types";

CustomerItem.propTypes = {};

function CustomerItem(props) {
	const { customer, index } = props;
	return (
		<tr>
			<th scope="row">{index}</th>
			<td>
				<div className="overflow-hidden">
					<p className="mb-0 font-weight-medium">
						<a href="javascript: void(0);">{customer.fullname}</a>
					</p>
					<span className="font-13">{customer.email}</span>
				</div>
			</td>
			<td>{customer.phone}</td>
			<td>{customer.address}</td>
		</tr>
	);
}

export default CustomerItem;
