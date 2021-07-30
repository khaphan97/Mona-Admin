import { Button, Popconfirm, Table } from "antd";
import { deleteCateAsync } from "app/categoriesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "./CategoryForm";

function CategoryTable(props) {
	const loading = useSelector((state) => state.categories.isLoading);

	const { onSelectedCate } = props;

	const CATEGORIES = useSelector((state) => state.categories.categories);

	const dispatch = useDispatch();

	const handleSelected = (record) => {
		onSelectedCate(record);
	};

	const handleDelete = (id) => {
		dispatch(deleteCateAsync(id));
	};

	const columns = [
		{
			title: "Tên danh mục",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Hành động",
			key: "product_control",
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
						<Link to={`/categories/update/${record.id}`} state={record}>
							<Button type="primary" onClick={() => handleSelected(record)}>
								Sửa
							</Button>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<h3>Quản lý danh mục</h3>
			<Button type="primary" className="my-3">
				<Link to="/categories/add">Thêm mới</Link>
			</Button>
			<Table loading={loading} columns={columns} dataSource={CATEGORIES} rowKey="id" />
		</div>
	);
}

export default CategoryTable;
