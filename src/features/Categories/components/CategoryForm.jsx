import { Form, Input, Button, message } from "antd";
import useSelection from "antd/lib/table/hooks/useSelection";
import CategoriesAPI from "api/categoriesAPI";
import { addCateAsync, updateCateAsync } from "app/categoriesSlice";
import EditorForm from "components/EditorForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./style.scss";
function CategoryForm(props) {
	const loading = useSelector((state) => state.categories.isLoading);

	const [initialValues, setInitialValues] = React.useState(null);

	const [isUpdate, setIsUpdate] = React.useState(false);

	const dispatch = useDispatch();

	const { id } = useParams();

	React.useEffect(() => {
		const getCateById = async () => {
			if (id) {
				const res = await CategoriesAPI.getCategoryById(id);
				console.log(res);
				if (res.status) {
					const formData = {
						category_name: res.data.name,
					};
					setInitialValues(formData);
					setIsUpdate(true);
				}
			} else {
				setInitialValues([]);
			}
		};
		getCateById();
	}, [id]);

	const onFinish = (data) => {
		if (isUpdate) {
			data.id = id;
			console.log("update");
			dispatch(updateCateAsync(data));
		} else {
			console.log(data);
			dispatch(addCateAsync(data));
			
		}
	};

	if (!initialValues) {
		return <p>Loading....</p>;
	}

	return (
		<div className="cate_form">
			<h3>Thêm danh mục mới</h3>
			<Form name="categoryForm" onFinish={onFinish} initialValues={initialValues}>
				<Form.Item
					label="Tên danh mục"
					name="category_name"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên danh mục",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button loading={loading} disabled={loading} type="primary" htmlType="submit">
						Thêm mới
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default CategoryForm;
