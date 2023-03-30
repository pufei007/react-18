const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// 创建文件夹
const timestamp = new Date().getTime();
const folderPath = path.join(__dirname, `images-${timestamp}`);
fs.mkdirSync(folderPath);

// 定义需要爬取的网站 URL
const url =
  "https://altphotos.com/photo/blue-grunge-cracked-wall-texture-3619/";

// 发送 HTTP GET 请求获取网页 HTML 内容
axios
  .get(url)
  .then((response) => {
    // 使用 cheerio 解析 HTML 内容
    const $ = cheerio.load(response.data);

    // 在 HTML 内容中查找图片标签并获取图片 URL
    const imageUrls = [];
    $("img").each((i, element) => {
      const imageUrl = $(element).attr("src");
      const imageAlt = $(element).attr("alt");
      if (imageUrl) {
        imageUrls.push({
          imageUrl,
          imageAlt,
        });
      }
    });

    console.log("imageUrls", imageUrls);

    // 下载图片并保存到本地
    imageUrls.forEach((item, i) => {
      axios({
        method: "get",
        url: item.imageUrl,
        responseType: "stream",
      }).then((response) => {
        const imagePath = path.join(
          folderPath,
          `image_${i}_${item.imageAlt}.jpg`
        );
        // const imagePath = path.join(__dirname, `image_${i}.jpg`);
        response.data.pipe(fs.createWriteStream(imagePath));
        console.log("Image saved successfully!");
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
