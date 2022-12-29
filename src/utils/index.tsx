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
