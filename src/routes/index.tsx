import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Test from "../pages/test";
import Cesium from "../pages/cesium";

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
