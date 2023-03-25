/**
 * 文字复制到剪贴板
 * @param text string
 * @returns
 */
export const copyText = async (text: string) =>
  await navigator.clipboard.writeText(text);

/**
 * 随机颜色
 * @returns color
 */
export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
};

/**
 * dom节点平滑滚动到可视区域，顶部，底部
 * @param element
 */
export const scrollTo = (element: any) => {
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  element.scrollIntoView({ behavior: "smooth", block: "end" });
  element.scrollIntoView({ behavior: "smooth" });
};
/**
 * 把数组最后一项移到第一项
 * @param arr
 * @returns new array
 */
export const lastToFirst = (arr: any[]) => {
  return arr.unshift(arr.pop());
};

/**
 * 把数组的第一项放到最后一项
 * @param arr
 * @returns new array
 */
export const firstToLast = (arr: any[]) => {
  return arr.push(arr.shift());
};

// 各种数组克隆
const clone1 = (arr: any[]) => arr.slice(0);
const clone2 = (arr: any[]) => [...arr];
const clone3 = (arr: any[]) => Array.from(arr);
const clone4 = (arr: any[]) => arr.map((x) => x);
const clone5 = (arr: any[]) => JSON.parse(JSON.stringify(arr));
const clone6 = (arr: any[]) => arr.concat([]);
// @ts-ignore
const clone7 = (arr: any[]) => window?.structuredClone?.(arr);

/**
 * 设置cookie
 * @param name
 * @param value
 * @param day
 */
export const setCookie = (name: string, value: string | null, day: number) => {
  let date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + "=" + value + ";expires=" + date;
};

/**
 *
 * 获取cookie
 * @param name
 * @returns
 */
export const getCookie = (name: string) => {
  let reg = RegExp(name + "=([^;]+)");
  let arr = document.cookie.match(reg);
  if (arr) {
    return arr[1];
  } else {
    return "";
  }
};

/**
 * 删除cookie
 * @param name
 */
export const delCookie = (name: string) => {
  setCookie(name, null, -1);
};
