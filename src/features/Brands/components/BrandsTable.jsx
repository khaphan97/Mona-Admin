import { Popconfirm, Button, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrandAsync } from "app/categoriesSlice";

function BrandsTable(props) {
	const BRANDS = useSelector((state) => state.categories.brands);

	const loading = useSelector((state) => state.categories.isLoading);


	const dispatch = useDispatch();

	const handleDelete = (id) => {
		dispatch(deleteBrandAsync(id));
	};

	const columns = [
		{
			title: "Tên danh mục",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Hành động",
			key: "brand_control",
			render: (text, record) => {
				return (
					<div className="d-flex">
						<Popconfirm
							title="Bạn có thật sự muốn xóa danh mục này"
							onConfirm={() => handleDelete(record.id)}
							onCancel={() => false}
							okText="Có"
							cancelText="Không"
						>
							<Button type="primary" className="mr-3" danger>
								Xóa
							</Button>
						</Popconfirm>
						<Link to={`/brands/update/${record.id}`} state={record}>
							<Button type="primary">Sửa</Button>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<div>
				<h3>Quản lý thương hiệu</h3>
				<Button type="primary" className="my-3">
					<Link to="/brands/add">Thêm mới</Link>
				</Button>
				<Table loading={loading} columns={columns} dataSource={BRANDS} rowKey="id" />
			</div>
		</div>
	);
}

export default BrandsTable;
