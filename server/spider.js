const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// const url = "https://www.zhihu.com/billboard";
const url =
  "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true";

axios
  .get(url)
  .then((response) => {
    // fetch api
    const resList = response.data.data ?? [];
    const topList = [];
    resList?.forEach((element, index) => {
      topList.push({
        index: index + 1,
        title: element?.target?.title,
        url: element?.target?.url,
        url: `https://www.zhihu.com/question/${element?.target?.id}`,
        hot: element?.detail_text,
      });
    });
    console.log("topList", topList);
    // 将数据写入本地文件
    fs.writeFile("data.txt", JSON.stringify(topList), function (err) {
      if (err) throw err;
      console.log("数据已保存到 data.txt 文件");
    });

    // load html
    const $ = cheerio.load(response.data);
    const list = [];
    $("a.HotList-item").each((i, element) => {
      const title = $(element).find("div.HotList-itemTitle").text();
      list.push({
        index: i,
        title: title,
      });
      // const link = $(element).find("a.HotItem-contentTitle").attr("href");
    });
    console.log("list", list);
  })
  .catch((error) => {
    console.log(error);
  });
