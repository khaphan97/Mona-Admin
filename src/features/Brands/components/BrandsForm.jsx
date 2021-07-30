import { Form, Button, Input, Skeleton } from "antd";
import CategoriesAPI from "api/categoriesAPI";
import { addBrandAsync, updateBrandAsync } from "app/categoriesSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function BrandsForm(props) {
	const loading = useSelector((state) => state.categories.isLoading);

	const [initialValues, setInitialValues] = React.useState(null);

	const [isUpdate, setIsUpdate] = React.useState(false);

	const dispatch = useDispatch();

	const { id } = useParams();

	React.useEffect(() => {
		const getBrandById = async () => {
			if (id) {
				const res = await CategoriesAPI.getBrandById(id);
				console.log(res);
				if (res.status) {
					const formData = {
						brand_name: res.data.name,
					};
					setInitialValues(formData);
					setIsUpdate(true);
				}
			} else {
				setInitialValues([]);
			}
		};
		getBrandById();
	}, [id]);

	const onFinish = (values) => {
		console.log(values);
		if (!isUpdate) {
			dispatch(addBrandAsync(values));
		} else {
			const data = {
				id,
				name: values.brand_name,
			};
			dispatch(updateBrandAsync(data));
		}
	};

	if (!initialValues) {
		return (
			<div className="cate_form">
				<Skeleton active />
			</div>
		);
	}

	return (
		<div>
			<div className="cate_form">
				<h3>Thêm thương hiệu mới</h3>
				<Form name="categoryForm" onFinish={onFinish} initialValues={initialValues}>
					<Form.Item
						label="Tên thương hiệu"
						name="brand_name"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên thương hiệu",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button loading={loading} disabled={loading} type="primary" htmlType="submit">
							{isUpdate ? "Cập nhật" : "Thêm mới"}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default BrandsForm;
