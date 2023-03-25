import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { delCookie, getCookie } from "@/utils";
import UrlUtils from "@/utils/url";

const base = "http://localhost:8889"; // /api/
let timer = 0;

interface ResponseType extends AxiosResponse<any, any> {
  code?: number;
  data: any;
  msg?: any;
}

axios.defaults.timeout = 10000; // 超时
// axios.defaults.withCredentials = true; // withCredentials

axios.interceptors.request.use(
  (config) => {
    clearTimeout(timer);
    let token = getCookie?.("token") || "";
    if (config?.headers) config.headers["token"] = token;
    return config;
  },
  (err) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      message.error("网络请求超时");
    }, 50);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (data) => {
    return data?.data;
  },
  (err) => {
    if (!err.response) {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        message.error("服务器内部错误");
      }, 50);
      return Promise.reject(err);
    }

    let status = err.response.status;
    let api: string = err?.config?.url;

    switch (status) {
      case 504:
        message.error(api + "服务器内部错误");
        break;
      case 502:
        message.error(
          "服务异常，可能存在以下问题：1.服务正在部署 2.其他内部问题"
        );
        break;
      case 500:
        message.error(api + "服务器开小差了");
        break;
      case 401:
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          message.warning("登录超时，请重新登录");
          window.location.hash = "/login";
          delCookie("token");
        }, 500);
        message.error(api + "服务器内部错误");
        break;
      case 400:
        message.error(api + "请求传递参数错误");
        break;
      case 404:
        message.error(api + "接口不存在");
        break;
      case 405:
        message.error(api + "请求类型错误");
        break;
      default:
        message.error(api + "服务器内部错误");
    }

    return Promise.reject(err);
  }
);

// @RequestParam请求（表单方式提交数据）
export const postRequestParams = (
  url: string,
  params: any
): Promise<ResponseType> => {
  return axios({
    url: `${base}${url}`,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: [
      (data) => {
        let result = "";
        for (let key in data) {
          result +=
            encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
        }
        return result.slice(0, result.length - 1);
      },
    ],
  });
};

// @RequestBody请求（json方式提交数据）
export const post = (url: string, params: any): Promise<ResponseType> => {
  return axios({
    url: `${base}${url}`,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get = (url: string, params: any): Promise<ResponseType> => {
  return axios({
    url: UrlUtils.setParamsToUrl(`${base}${url}`, params),
    method: "get",
  });
};

export const postDownload = (
  url: string,
  params: any,
  onDownloadProgress?: (progressEvent: any) => void
): Promise<ResponseType> => {
  return axios({
    url: `${base}${url}`,
    method: "post",
    data: params,
    onDownloadProgress,
    responseType: "blob",
  });
};

export const getDownload = (
  url: string,
  params: any,
  onDownloadProgress?: (progressEvent: any) => void
): Promise<ResponseType> => {
  return axios({
    url: `${base}${url}`,
    method: "get",
    data: params,
    onDownloadProgress,
    responseType: "blob",
  });
};

export const upload = (
  url: string,
  params: any,
  onUploadProgress?: (progressEvent: any) => void
): Promise<ResponseType> => {
  let data = new FormData();

  Object.keys(params).forEach((key) => {
    data.append(key, params[key]);
  });

  return axios({
    url: `${base}${url}`,
    method: "post",
    data,
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fileDownload = async (url: string, params: any) => {
  const res = await getDownload(url, params);

  /**
   * 判断response返回的是文件流还是JSON对象
   * 若JSON.parse()不报错，说明响应结果是JSON对象，则弹框错误提示
   * 若JSON.parse()报错，说明响应结果是文件流，则做文件下载处理
   */
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const resParse = JSON.parse(reader.result as string);
      if (!resParse || resParse?.code !== 1) {
        return message.error(resParse?.msg || "下载失败");
      }
    } catch {
      // 为blob设置文件类型，这里以.xlsx为例
      let blob = new Blob([res as any], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;", //'application/vnd.ms-excel'=>.xls
      });
      // 创建一个临时的url指向blob对象
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.download = "自定义文件名" + +new Date();
      a.style.display = "none";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // 释放这个临时的对象url
      window.URL.revokeObjectURL(url);
      message.success("下载成功");
    }
  };
  reader.readAsText(res as any);
};

export default axios;
