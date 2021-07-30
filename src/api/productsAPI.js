import axiosInstance from "api/axiosConfig";

export default class ProductAPI {
	static async getListProducts() {
		try {
			const response = await axiosInstance.get("product");
			if (response.status === 200) {
				return {
					status: response.statusText,
					data: response.data,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async addProduct(product) {
		try {
			let formData = new FormData();
			formData.append("product_name", product.name);
			formData.append("product_price", product.price);
			formData.append("product_detail", product.detail);
			formData.append("product_cate_id", product.category);
			formData.append("product_brand_id", product.brand);
			formData.append("product_brand_id", product.brand);

			let formImg = new FormData();
			formImg.append("file", product.image);
			formImg.append("upload_preset", "kmsqgojv");

			const img = await axiosInstance.post(
				"https://api.cloudinary.com/v1_1/khaphanhuy/image/upload",
				formImg,
			);

			formData.append("product_img", img.data.url);
			let configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			const response = await axiosInstance.post("product", formData, configAxios);
			return response.data;
		} catch (error) {}
	}

	static async deleteProduct(id) {
		try {
			let formData = new FormData();
			formData.append("id", id);
			const response = await axiosInstance.post(`product/delete`, formData);
			if (response.status === 200) {
				return {
					productId: id,
					status: response.data.status,
					message: response.data.message,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async getProductById(id) {
		try {
			const res = await axiosInstance.get(`product/index/?id=${id}`);
			if (res.status === 200) {
				return {
					status: true,
					data: res.data,
				};
			}
		} catch (error) {
			return {
				status: false,
				error,
			};
		}
	}

	static async updateProductById(product) {
		try {
			let formData = new FormData();
			formData.append("product_name", product.name);
			formData.append("product_price", product.price);
			formData.append("product_detail", product.detail);
			formData.append("product_cate_id", product.category);
			formData.append("product_brand_id", product.brand);
			formData.append("product_id", product.id);

			let formImg = new FormData();
			formImg.append("file", product.image);
			formImg.append("upload_preset", "kmsqgojv");

			const img = await axiosInstance.post(
				"https://api.cloudinary.com/v1_1/khaphanhuy/image/upload",
				formImg,
			);

			formData.append("product_img", img.data.url);
			let configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};
			const res = await axiosInstance.post(`product`, formData, configAxios);
			if (res.status === 200) {
				return {
					status: true,
					data: res.data,
				};
			}
		} catch (error) {
			return {
				status: false,
				error,
			};
		}
	}
}
