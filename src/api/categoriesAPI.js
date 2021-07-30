import axiosInstance from "api/axiosConfig";

export default class CategoriesAPI {
	static async getListCategories() {
		try {
			const response = await axiosInstance.get("category");
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

	static async getCategoryById(id) {
		try {
			const res = await axiosInstance.get(`category/index/?id=${id}`);
			if (res.status === 200) {
				return {
					status: true,
					data: res.data,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async addNewCate(data) {
		try {
			let formData = new FormData();
			formData.append("name", data.category_name);

			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("category", formData, configAxios);
			if (res.status === 200) {
				const { data } = res;
				return {
					status: data.status,
					message: data.message,
					newCate: data.newCate,
				};
			}
		} catch (error) {
			return {
				status: error.response.statusText,
				data: error.response.data,
			};
		}
	}

	static async updateCate(data) {
		try {
			let formData = new FormData();
			formData.append("name", data.category_name);
			formData.append("id", data.id);
			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("category/update", formData, configAxios);
			if (res.status === 200) {
				const { data } = res;
				return {
					status: data.status,
					message: data.message,
					newCate: data.newCate,
				};
			}
		} catch (error) {
			console.log(error.response);
			return {
				status: error.response.statusText,
				data: error.response.data,
			};
		}
	}

	static async deleteCate(id) {
		try {
			let formData = new FormData();
			formData.append("id", id);

			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("category/delete", formData, configAxios);
			if (res.status === 200) {
				return {
					cateId: id,
					status: res.data.status,
					message: res.data.message,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async getListBrands() {
		try {
			const response = await axiosInstance.get("brands");
			if (response.status === 200) {
				return {
					status: response.statusText,
					data: response.data,
				};
			}
		} catch (error) {
			return {
				status: error.response.statusText,
				data: error.response.data,
			};
		}
	}

	static async getBrandById(id) {
		try {
			const res = await axiosInstance.get(`brands/index/?id=${id}`);
			if (res.status === 200) {
				return {
					status: true,
					data: res.data,
				};
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async addNewBrand(data) {
		try {
			let formData = new FormData();
			formData.append("name", data.brand_name);
			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("brands", formData, configAxios);
			if (res.status === 200) {
				const { data } = res;
				console.log(data);
				return {
					status: data.status,
					message: data.message,
					newBrand: data.newCate,
				};
			}
		} catch (error) {
			return {
				status: error.response.statusText,
				data: error.response.data,
			};
		}
	}

	static async deleteBrand(id) {
		try {
			let formData = new FormData();
			formData.append("id", id);

			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("brands/delete", formData, configAxios);

			if (res.status === 200) {
				return {
					cateId: id,
					status: res.data.status,
					message: res.data.message,
				};
			}
		} catch (error) {}
	}

	static async updateBrand(data) {
		try {
			console.log(data);
			let formData = new FormData();
			formData.append("name", data.name);
			formData.append("id", data.id);
			const configAxios = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			const res = await axiosInstance.post("brands/update", formData, configAxios);
			if (res.status === 200) {
				const { data } = res;
				console.log(data);
				return {
					status: data.status,
					message: data.message,
					newBrand: data.newBrand,
				};
			}
		} catch (error) {
			console.log(error.response);
			return {
				status: error.response.statusText,
				data: error.response.data,
			};
		}
	}
}
