const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const app = express();
const host = "localhost";
const port = "8889";

app.use(express.json());

app.use(
  cors({
    // origin: [
    //   "*",
    //   "http://106.13.51.5:8080", // 允许的域名
    // ],
    // credentials: true, // 允许cookie
    // exposedHeaders: "token", // 扩展表头
  })
);

// app.use((_req, res, next) => {
//   console.log("_req", _req);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", [
//     "Content-Type",
//     "Content-Length",
//     "Token",
//     "Accept",
//     "X-Requested-With",
//   ]);
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);

//   if (_req.method === "OPTIONS") {
//     res.end();
//   } else {
//     next();
//   }
// });

app.post("/api/register", (req, res) => {
  res.send({
    code: 1,
    data: [
      {
        a: 2,
        b: 3,
      },
    ],
    msg: "",
  });
});

app.post("/api/login", (req, res) => {
  res.send({
    code: 1,
    data: [
      {
        a: 2,
        b: 3,
      },
    ],
    msg: "",
  });
});

app.get("/api/list", (req, res) => {
  fs.readFile("data.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("读取文件失败");
    } else {
      res.send({
        code: 1,
        data: JSON.parse(data),
        msg: "",
      });
    }
  });
});

app.get("/api/getTopList", async (req, res) => {
  try {
    // 发送 HTTP 请求，获取响应数据
    const response = await axios.get(
      "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true"
    );

    const resList = response.data?.data ?? [];
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

    // 将解析后的信息作为响应数据返回给前端
    res.send({
      code: 1,
      data: topList,
      msg: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
