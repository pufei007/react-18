import React from "react";
import { ConfigProvider } from "antd";
import Router from "./routes/index";
import "reset-css/reset.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import "./styles/common.less";

dayjs.locale("zh-cn");

const App = () => {
  return (
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  );
};

export default App;
