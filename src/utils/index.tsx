/**
 * 文字复制到剪贴板
 * @param text string
 * @returns
 */
export const copyText = async (text: string) =>
  await navigator.clipboard.writeText(text);
