const express = require("express");
const cors = require("cors");
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

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
