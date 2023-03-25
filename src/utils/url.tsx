interface Params {
  [key: string]: any;
}

class UrlUtils {
  static setParamsToUrl = (url: string, params: Params) => {
    let urlStr = url;
    if (params && Object.keys(params).length) {
      urlStr += "?";
      Object.keys(params).forEach((item, index) => {
        if (params[item] === undefined || params[item] === null) {
          return;
        }
        if (index === Object.keys(params).length - 1) {
          urlStr += item + "=" + params[item];
        } else {
          urlStr += item + "=" + params[item] + "&";
        }
      });
    }

    return urlStr;
  };
}

export default UrlUtils;
