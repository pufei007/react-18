const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// 创建文件夹
const timestamp = new Date().getTime();
const folderPath = path.join(__dirname, `api-result-data-${timestamp}`);
fs.mkdirSync(folderPath);

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
    fs.writeFile(
      path.join(folderPath, `data-${timestamp}.txt`),
      JSON.stringify(topList),
      function (err) {
        if (err) throw err;
        console.log("数据已保存到 data.txt 文件");
      }
    );

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

/**
 * BAIDU(1, 1, "百度", "实时热点", "https://www.baidu.com", "http://top.baidu.com/buzz?b=1&c=513&fr=topbuzz_b341_c513"),
    ZHIHU_DAILY(2, 2, "知乎", "知乎日报", "https://daily.zhihu.com"),
    ZHIHU_HOT(3, 2, "知乎", "知乎热榜", "https://www.zhihu.com", "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=tru"),
    ZHIHU_SPORT(4, 2, "知乎", "体育榜", "https://www.zhihu.com", "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/sport?limit=50&desktop=true"),
    ZHIHU_CAR(5, 2, "知乎", "汽车榜", "https://www.zhihu.com", "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/car?limit=50&desktop=true"),
    WEIBO(6, 3, "微博", "热搜榜", "https://s.weibo.com/top/summary?Refer=top_hot&topnav=1&wvr=6"),
    DOUYIN_WORD(7, 4, "抖音", "热点榜", "https://www.iesdouyin.com/share/billboard", "https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/"),
    DOUYIN_VIDEO(8, 4, "抖音", "视频榜", "https://www.iesdouyin.com/share/billboard", "https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/aweme/"),
    JI_KI_PE_DIA(9, 5, "小鸡词典", "热门搜索", "https://jikipedia.com/", "https://api.jikipedia.com/go/get_hot_search"),
    BILI_BILI(10, 6, "哔哩哔哩", "全站日榜", "https://www.bilibili.com/", "https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all"),
     const { location = 'New York' } = ctx.query;
  const url = `http://api.weatherstack.com/current?access_key=95f5ee664befefc1c49fa0dac0da19c7&query=${location}`;
 */
