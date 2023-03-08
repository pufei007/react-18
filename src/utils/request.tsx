import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:7001"; // 后端地址
axios.defaults.timeout = 10000; // 超时
axios.defaults.withCredentials = false;
axios.defaults.headers["x-Request-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
