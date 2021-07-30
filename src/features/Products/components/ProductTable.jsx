import { Button, Popconfirm, Table } from "antd";
import { deleteProductAsync, getProductsAsync } from "app/productsSlice";
import Currency from "Helper/currency";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

function ProductTable(props) {
	const loading = useSelector((state) => state.products.isLoading);

	let { url } = useRouteMatch();

	const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

	const { pathname } = useLocation();

	let data = useSelector((state) => state.products.listProduct);

	const dispatch = useDispatch();

	React.useEffect(() => {
		const getListProduct = () => {
			dispatch(getProductsAsync());
		};
		getListProduct();
	}, [pathname, dispatch]);

	const onSelectChange = (selectedRowKeys) => {
		console.log("selectedRowKeys changed: ", selectedRowKeys);
		setSelectedRowKeys(selectedRowKeys);
	};

	const handleDelete = (id) => {
		const productId = +id;
		dispatch(deleteProductAsync(productId));
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			{
				key: "Delete",
				text: "Delete selected row",
				onSelect: (changableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changableRowKeys.filter((key, index) => {
						if (index % 2 !== 0) {
							return false;
						}
						return true;
					});
					setSelectedRowKeys({ selectedRowKeys: newSelectedRowKeys });
				},
			},
		],
	};

	const columns = [
		{
			title: "Tên sản phẩm",
			dataIndex: "product_name",
			key: "product_name",
		},

		{
			title: "Hình ảnh",
			dataIndex: "product_img",
			key: "product_img",
			render: (text, record) => <img src={record.product_img} alt="" width="150" />,
		},
		{
			title: "Giá sản phẩm",
			dataIndex: "product_price",
			key: "product_price",
			render: (text, record) => Currency.format(record.product_price),
			sorter: {
				compare: (a, b) => a.product_price - b.product_price,
			},
		},
		{
			title: "Danh mục cha",
			dataIndex: "product_cate_id",
			key: "product_cate_id",
			filters: [
				{ text: "Đồng Hồ Nam", value: "1" },
				{ text: "Đồng Hồ Nữ", value: "2" },
				{ text: "Đồng Hồ Đôi", value: "3" },
			],
			onFilter: (value, record) => record.product_cate_id.includes(value),
			render: (text, record) => {
				switch (+record.product_cate_id) {
					case 1: {
						return <p>Đồng Hồ Nam</p>;
					}
					case 2: {
						return <p>Đồng Hồ Nữ</p>;
					}
					default: {
						return <></>;
					}
				}
			},
		},
		{
			title: "Hành động",
			dataIndex: "product_control",
			key: "product_control",
			render: (text, record) => {
				return (
					<div className="d-flex">
						<Popconfirm
							title="Bạn có thật sự muốn xóa sản phẩm này"
							onConfirm={() => handleDelete(record.product_id)}
							onCancel={() => false}
							okText="Có"
							cancelText="Không"
						>
							<Button type="primary" className="mr-3" danger>
								Xóa
							</Button>
						</Popconfirm>
						<Link to={`product/update/${record.product_id}`}>
							<Button type="primary">Sửa</Button>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div className="p-3">
			<h3 className="">Quản lý sản phẩm</h3>
			<Button type="primary mb-5 mt-3">
				<Link to={`/product/add`}>Thêm mới</Link>
			</Button>
			<Table
				loading={loading}
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data}
				rowKey="product_id"
			/>
		</div>
	);
}

export default ProductTable;
