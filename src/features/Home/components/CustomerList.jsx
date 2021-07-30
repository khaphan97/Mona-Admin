import React from "react";
import CustomerItem from "./CustomerItem";

function CustomerList(props) {
	const { customerInfo } = props;
	const customerElement = customerInfo.map((customer, index) => {
		return <CustomerItem customer={customer} index={++index} />;
	});

	return (
		<div className="col-12">
			<div className="card">
				<div className="card-body">
					<h4 className="header-title">Danh sách khách hàng</h4>
					<div className="table-responsive mt-3">
						<table className="table table-hover table-centered mb-0">
							<thead>
								<tr>
									<th>ID</th>
									<th>Thông tin</th>
									<th>Số Điện Thoại</th>
									<th>Địa Chỉ</th>
								</tr>
							</thead>
							<tbody>{customerElement}</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomerList;
