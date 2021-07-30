import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://phanhuykha.000webhostapp.com/index.php/",
	// baseURL: "http://127.0.0.1:3008/",
	headers: {
		accept: "application/json",
	},
});

export default axiosInstance;
