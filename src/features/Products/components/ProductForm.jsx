import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ProductAPI from "api/productsAPI";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const layout = {
	labelCol: {
		span: 2,
	},
	wrapperCol: {
		span: 6,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 2,
		span: 6,
	},
};

const ProductForm = () => {
	const history = useHistory();

	const [urlImg, setUrlImage] = React.useState("");

	const [fileList, setFileList] = React.useState(null);

	const { id } = useParams();

	const [initialValues, setInitialValues] = React.useState(null);

	React.useEffect(() => {
		const getProductById = async () => {
			if (id) {
				const res = await ProductAPI.getProductById(id);
				console.log(res);
				if (res.status) {
					const {
						product_name,
						product_price,
						product_cate_id,
						product_brand_id,
						product_detail,
						product_img,
					} = res.data;
					const formValues = {
						name: product_name,
						price: product_price,
						category: product_cate_id,
						brand: product_brand_id,
						detail: product_detail,
					};
					setInitialValues(formValues);
					setUrlImage(product_img);
					setFileList([
						{
							name: "Image",
							status: "done",
							url: product_img,
							thumbUrl: product_img,
						},
					]);
				}
			} else {
				setInitialValues([]);
				setFileList([]);
			}
		};
		getProductById();
	}, [id]);

	const categories = useSelector((state) => state.categories.categories);

	const brands = useSelector((state) => state.categories.brands);

	const [isLoading, setLoading] = React.useState(false);

	const categoryItems = categories.map((option, index) => {
		return (
			<Select.Option key={index} value={option.id}>
				{option.name}
			</Select.Option>
		);
	});

	const brandsItem = brands.map((option, index) => {
		return (
			<Select.Option key={index} value={option.id}>
				{option.name}
			</Select.Option>
		);
	});

	const normFile = (e) => {
		let reader = new FileReader();

		let obj_image = {
			base64URL: "",
			objFile: null,
		};

		if (e.fileList[0]) {
			console.log(e);
			reader.readAsDataURL(e.file);
		}

		reader.addEventListener(
			"load",
			() => {
				let previewSrc = reader.result;
				obj_image.base64URL = previewSrc;
				obj_image.objFile = e.file;
				setUrlImage(obj_image.base64URL);
			},
			false,
		);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const onFinish = async (values) => {
		const data = { ...values };
		data.image = urlImg;
		if (id) {
			data.id = id;
			setLoading(true);
			const res = await ProductAPI.updateProductById(data);
			console.log(res);
			setLoading(false);
			if (res.status) {
				message.success(res.data.message);
			} else {
				message.error(res.data.message);
			}
		} else {
			setLoading(true);
			const res = await ProductAPI.addProduct(data);
			setLoading(false);
			if (res.status) {
				message.success(res.message);
				history.push("/product");
			} else {
				message.error(res.message);
			}
		}
	};

	const checkPrice = (_, value) => {
		if (value > 0) {
			return Promise.resolve();
		}

		return Promise.reject(new Error("Gi?? ti???n s???n ph???m kh??ng h???p l???"));
	};
	if (!initialValues || !fileList) {
		return <p>Loading...</p>;
	}

	console.log(fileList);

	return (
		<div className="py-5">
			<h3 className="mb-5">Th??m s???n ph???m m???i</h3>
			<Form className="" {...layout} name="basic" initialValues={initialValues} onFinish={onFinish}>
				<Form.Item
					label="T??n s???n ph???m"
					name="name"
					rules={[
						{
							required: true,
							message: "Vui l??ng nh???p t??n s???n ph???m",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Gi??"
					name="price"
					rules={[
						{
							required: true,
							validator: checkPrice,
						},
					]}
				>
					<Input value={"asdadas"} />
				</Form.Item>

				<Form.Item
					label="Danh m???c"
					name="category"
					rules={[
						{
							required: true,
							message: "Vui l??ng ch???n danh m???c",
						},
					]}
				>
					<Select>{categoryItems}</Select>
				</Form.Item>

				<Form.Item
					label="Th????ng hi???u"
					name="brand"
					rules={[
						{
							required: true,
							message: "Vui l??ng ch???n danh m???c",
						},
					]}
				>
					<Select>{brandsItem}</Select>
				</Form.Item>

				<Form.Item
					name="image"
					label="H??nh ???nh"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload
						name="image"
						multiple={false}
						listType="picture"
						defaultFileList={[...fileList]}
						maxCount={1}
						beforeUpload={() => false}
					>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					name="detail"
					label="Chi ti???t b??i vi???t"
					rules={[{ required: true, message: "Vui l??ng nh???p chi ti???t b??i vi???t" }]}
				>
					<TextArea placeholder="Chi ti???t b??i vi???t" allowClear rows="10" />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button loading={isLoading} type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProductForm;
