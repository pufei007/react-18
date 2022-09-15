import React, { Suspense, lazy, Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Test from "../pages/test";
// import Cesium from "../pages/cesium";

const Test = lazy(() => import("../pages/test"));
const Cesium = lazy(() => import("../pages/cesium"));

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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
