const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

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

// 创建MySQL连接池
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

// 注册API
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  pool.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, hashedPassword, email],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "注册失败" });
      } else {
        res.send({ message: "注册成功" });
      }
    }
  );
});

// 登录API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "登录失败" });
      } else if (results.length === 0) {
        res.status(401).json({ message: "用户名或密码错误" });
      } else {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          res.json({ message: "登录成功" });
        } else {
          res.status(401).json({ message: "用户名或密码错误" });
        }
      }
    }
  );
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
