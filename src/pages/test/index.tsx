import React, { useState } from "react";
// import axios from "axios";
import { get, post } from "@/utils/request";
import "./index.less";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await post("/register", {
        username,
        password,
        email,
      });
      console.log("response", response);
      // alert(response.data.message);
    } catch (error) {
      alert("注册失败");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名：</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label>密码：</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>电子邮箱：</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">注册</button>
      </div>
    </form>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await post("/login", { username, password });
      alert(response.data.message);
    } catch (error) {
      alert("登录失败");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>用户名：</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label>密码：</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">登录</button>
      </div>
    </form>
  );
}

function App() {
  return (
    <div>
      <h1>注册</h1>
      <Register />
      <h1>登录</h1>
      <Login />
      <div className="cone"></div>
    </div>
  );
}

export default App;
