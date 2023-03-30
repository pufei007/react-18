const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 搜索关键词
const keyword = "sea";

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // 打开目标页面
  await page.goto("https://altphotos.com/");

  // 等待页面加载完成
  await page.waitForSelector("input.search-form__input");

  // 输入关键词并搜索
  await page.type("input.search-form__input", keyword);
  await page.click("button.search-button");

  // 等待搜索结果加载完成
  await page.waitForSelector("main#content");

  // 获取所有图片链接并下载
  const links = await page.$$eval("div.fleximages__item>a>img", (imgs) =>
    imgs.map((img) => img.src)
  );
  console.log("links", links);

  if (!links || !links.length) {
    console.log("links 为空");
    return;
  }
  const timestamp = Date.now();
  const dirPath = path.join(__dirname, `images_${timestamp}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const response = await axios.get(link, { responseType: "stream" });
    const filePath = path.join(dirPath, `${i + 1}.jpg`);
    response.data.pipe(fs.createWriteStream(filePath));
  }

  console.log("download finish");

  // 关闭浏览器
  await browser.close();
})();
