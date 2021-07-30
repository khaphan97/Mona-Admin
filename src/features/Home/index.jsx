import Currency from "Helper/currency";
import useOrdersDetail from "hooks/useOrdersDetail";
import React from "react";
import CustomerList from "./components/CustomerList";
import HomeCard from "./components/HomeCard";

function Home(props) {
	const { totalOrders, totalPrice, customerInfo } = useOrdersDetail();

	return (
		<div className="content-page">
			<div className="content">
				{/* Start Content*/}
				<div className="container-fluid">
					{/* start page title */}
					<div className="row">
						<div className="col-12">
							<div className="page-title-box">
								<div className="page-title-right">
									<ol className="breadcrumb m-0">
										<li className="breadcrumb-item">
											<a href="javascript: void(0);">Mona Media</a>
										</li>
										<li className="breadcrumb-item active">Trang Chủ</li>
									</ol>
								</div>
								<h4 className="page-title">Bảng điều khiển</h4>
							</div>
						</div>
					</div>
					{/* end page title */}
					<div className="row">
						<HomeCard
							title="Tổng số đơn hàng"
							number={totalOrders}
							icon="mdi mdi-cart text-primary widget-icon"
						/>
						<HomeCard
							title="Tổng số tiền"
							number={Currency.format(totalPrice)}
							icon="mdi mdi-currency-usd text-danger widget-icon"
						/>
						<HomeCard
							title="Số thành viên"
							number="1"
							icon="mdi mdi-account-multiple text-primary widget-icon"
						/>
						<HomeCard
							title="Số lượt truy cập"
							number="99999"
							icon="mdi mdi-eye-outline text-danger widget-icon"
						/>
					</div>
					{/* end row */}
					{/* <div className="row">
						<SaleAnalytics />
						<TopMarketplace />
					</div> */}
					<div className="row">
						<CustomerList customerInfo={customerInfo} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
