import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Spin } from "antd";

const Test = lazy(() => import("../pages/test"));
const Cesium = lazy(() => import("../pages/cesium"));
const Query = lazy(() => import("../pages/query"));
const Infinite = lazy(() => import("../pages/infinite"));
const Html2canvas = lazy(() => import("../pages/html2canvas"));
const AliReactTable = lazy(() => import("../pages/aliReactTable"));
const Three = lazy(() => import("../pages/three"));

const routes = [
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/cesium",
    element: <Cesium />,
  },
  {
    path: "/query",
    element: <Query />,
  },
  {
    path: "/infinite",
    element: <Infinite />,
  },
  {
    path: "/html2canvas",
    element: <Html2canvas />,
  },
  {
    path: "/aliReactTable",
    element: <AliReactTable />,
  },
  {
    path: "/three",
    element: <Three />,
  },
];

const RouterList = () => {
  const element = useRoutes(routes); // 读取路由数组
  return element;
};

const Router = () => {
  return (
    <Suspense fallback={<Spin />}>
      <RouterList />
    </Suspense>
  );
};

export default Router;
