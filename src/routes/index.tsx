import React, { Suspense, lazy, Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConfigProvider, DatePicker, message } from "antd";
import "../styles/common.less";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
// import "./index.css";

dayjs.locale("zh-cn");

const Test = lazy(() => import("../pages/test"));
const Cesium = lazy(() => import("../pages/cesium"));
const Query = lazy(() => import("../pages/query"));
const Infinite = lazy(() => import("../pages/infinite"));
const Html2canvas = lazy(() => import("../pages/html2canvas"));
const AliReactTable = lazy(() => import("../pages/aliReactTable"));

// eslint-disable-next-line react/display-name
const SuspenseComponent = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test></Test>}></Route>
          <Route path="cesium" element={<Cesium></Cesium>}></Route>
          <Route path="query" element={<Query></Query>}></Route>
          <Route path="infinite" element={<Infinite></Infinite>}></Route>
          <Route
            path="html2canvas"
            element={<Html2canvas></Html2canvas>}
          ></Route>
          <Route
            path="aliReactTable"
            element={<AliReactTable></AliReactTable>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
